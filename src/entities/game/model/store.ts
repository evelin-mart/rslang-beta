import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, GAME_PHASE, GameSource, GameResultsData } from './interface';
import { GAME, LEARN_CHAIN, MAX_PAGE, STATUS } from 'shared/constants';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { AsyncThunkConfig } from 'app/store';
import * as agWordsApi from 'shared/api/users-aggregated-words';
import * as wordsApi from 'shared/api/words';
import * as userWordsApi from 'shared/api/users-words';
import * as userStatsApi from 'shared/api/users-statistics';
import { dateToJson, getRandomInt, shuffle } from 'shared/lib';
import { defaultUserWord, UserWord } from 'shared/api/users-words';
import { UserState } from 'entities/user';
import { GameStatistics } from 'shared/api/users-statistics';
import { games } from 'shared/constants/games';

export const startGame = createAsyncThunk<AggregatedWord[] | void, void, AsyncThunkConfig>(
  'game/start', 
  async (
    _, { dispatch, getState }
  ) => {
  const {
    textbook: { page },
    game: { source, group, gameId },
    user,
  } = getState();


  const isFromTextbook = source === 'textbook';
  const maxWords = games[gameId as GAME].maxWords;

  let words: AggregatedWord[] = [];
  if (group === 6) {
    words = await getHardWords(maxWords);
  } else {
    words = await (
      isFromTextbook
        ? getWordsFromTextbook(group, page, user, maxWords)
        : getWordsFromRandomPage(group, user, maxWords)
    )
  }

  if (words.length === 0) throw new Error('There are no words to use in game');
  // console.log('Game words:', words.length, words.map(({ word }) => word).join(','))
  dispatch(setWords(words));
});

const getHardWords = async (maxWords: number) => {

  const words = await agWordsApi._getHardAggregatedWords();
  return words.length > maxWords
    ? shuffle(words).slice(0, maxWords)
    : words;

}

const getWordsFromTextbook = async (group: number, page: number, user: UserState, maxWords: number) => {
  let words: AggregatedWord[] = [];
  for (let pageNumber = page; pageNumber >= 0; pageNumber -= 1) {
    const options = { group, page: pageNumber };
    const currentPageWords: AggregatedWord[] = await (
      user.isAuthorized
        ? agWordsApi._getAggregatedWords(options)
        : wordsApi.getWords(options)
    );
    words = words.concat(
      user.isAuthorized
        ? currentPageWords.filter((word) => !word.userWord?.optional.isLearned)
        : currentPageWords
    )
    if (words.length >= maxWords) {
      return words.slice(0, maxWords);
    }
  }
  return words;
}

const getWordsFromRandomPage = async (group: number, user: UserState, maxWords: number) => {
  const usedPages: number[] = [];
  let words: AggregatedWord[] = [];
  while(words.length < maxWords) {
    let page = -1;
    do {
      page = getRandomInt(0, MAX_PAGE);
    } while (usedPages.includes(page));

    // console.log(`Get words from group ${group}, page: ${page}`);

    const options = { group, page };
    words = words.concat(await (user.isAuthorized
      ? agWordsApi._getAggregatedWords(options)
      : wordsApi.getWords(options)));
    
    if (words.length > maxWords) {
      return shuffle(words).slice(0, maxWords);
    }
  }
  return words;
}

export const finishGame = createAsyncThunk<void, void, AsyncThunkConfig>(
  'game/finish', 
  async (
    _, { dispatch, getState }
  ) => {
  const {
    game: { words, gameId, results, longestChain }, user,
  } = getState();
  
  dispatch(setGameResults(results));

  if (!user.isAuthorized) {
    dispatch(setGamePhase(GAME_PHASE.RESULTS));
    return;
  }

  const wordsData = processWords(words, results);
  // const { newWords, correctAnswers, percent, learnedWords } = wordsData.stats;
  // console.log(`New: ${newWords}\nCorrect: ${correctAnswers}\nPercent: ${percent}\nLearned: ${learnedWords}`);
  try {
    await Promise.all(wordsData.promises);
    if (gameId === null) return;
    await updateGameStats(gameId, longestChain, wordsData);
  } finally {
    dispatch(setGamePhase(GAME_PHASE.RESULTS));
  }
});

const updateGameStats = async (gameId: GAME, longestChain: number, { stats }: ReturnType<typeof processWords>) => {
  const { newWords, percent, learnedWords } = stats;
  const date = dateToJson(new Date());
  let userStats = userStatsApi.defaultUserStatistics;
  try {
    userStats = await userStatsApi.getUserStatistics();
  } catch {
    userStats = { optional: {
      [date]: {
        ...userStatsApi.defaultUserDailyStats
      }
    }};
  } finally {
    const oldStats = userStats.optional[date] || userStatsApi.defaultUserDailyStats;
    const gameStatsKey = games[gameId].statsKey;
    const [oldNewWords, oldPercent, oldChain] = oldStats[gameStatsKey] as GameStatistics;
    const newNewWords = oldNewWords + newWords;
    const newPercent = oldPercent !== 0 ? Math.round(oldPercent + percent) / 2 : percent;
    const newChain = Math.max(oldChain, longestChain);
    userStats.optional = {
      ...userStats.optional,
      [date]: {
        ...oldStats,
        [gameStatsKey]: [ newNewWords, newPercent, newChain ],
        lw: +oldStats.lw + learnedWords,
      },
    }
    await userStatsApi.updateUserStatistics(userStats);
  }
}

const processWords = (words: AggregatedWord[], results: GameResultsData) => {
  let newWords = 0;
  let correctAnswers = 0;
  let learnedWords = 0;
  const promises = words
    .filter(({ id }) => results[id] !== undefined)
    .map((word) => {
      const { userWord, id } = word;
      const wordResult = +results[id];
      correctAnswers += wordResult;
      if (userWord === undefined) {
        newWords += 1;
        return processNewWord(id, wordResult);
      } else {
        const { learnedInc, updatePromise } = processExistingWord(id, wordResult, userWord);
        learnedWords += learnedInc;
        return updatePromise;
      }
    });
  const resultsNumber = Object.keys(results).length;
  const percent = resultsNumber !== 0 ? Math.round(correctAnswers / resultsNumber * 100) : 0;
  return {
    stats: {
      newWords,
      correctAnswers,
      learnedWords,
      percent,
    },
    promises,
  }
}

const processNewWord = (id: string, wordResult: number) => {
  return userWordsApi.addUserWord(id, {
    optional: {
      ...defaultUserWord.optional,
      totalUsed: 1,
      guessed: wordResult,
      chain: wordResult,
    }
  })
}

const processExistingWord = (id: string, wordResult: number, userWord: UserWord) => {
  const { optional: { totalUsed, guessed, chain, learnDate, isHard, isLearned } } = userWord;
  const newChain = wordResult ? chain + wordResult : 0;
  const newIsLearned = Boolean(wordResult) && newChain >= LEARN_CHAIN;
  let newLearnDate = learnDate;
  let learnedInc = 0;
  const currentDate = dateToJson(new Date());
  if (!isLearned && newIsLearned) {
    learnedInc = 1;
    newLearnDate = currentDate;
  } else if (isLearned && !newIsLearned) {
    learnedInc = -1;
    newLearnDate = dateToJson(new Date(0));
  } 
  return {
    learnedInc,
    updatePromise: userWordsApi.updateUserWord(id, {
      optional: {
        ...userWord.optional,
        totalUsed: totalUsed + 1,
        guessed: guessed + wordResult,
        chain: newChain,
        isLearned: newIsLearned,
        isHard: newIsLearned ? false : isHard,
        learnDate: newLearnDate,
      }
    })
  }
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameId(state, action: PayloadAction<GAME>) {
      state.gameId = action.payload;
    },
    setGamePhase(state, action: PayloadAction<GAME_PHASE>) {
      state.gamePhase = action.payload;
    },
    setGameSource(state, action: PayloadAction<GameSource>) {
      state.source = action.payload;
    },
    toggleGameSound(state) {
      state.isSound = !state.isSound;
    },
    toggleGameFullscreen(state) {
      state.isFullscreen = !state.isFullscreen;
    },
    setWords(state, action: PayloadAction<AggregatedWord[]>) {
      state.words = action.payload;
    },
    setGameGroup(state, action: PayloadAction<number>) {
      state.group = action.payload;
    },
    setGameResults(state, action: PayloadAction<GameResultsData>) {
      state.results = action.payload;
    },
    addGameResult(state, action: PayloadAction<{id: string, result: boolean}>) {
      const { id, result } = action.payload;
      state.results = {...state.results, [id]: result };
    },
    setLongestChain(state, action: PayloadAction<number>) {
      state.longestChain = action.payload;
    },
    setGameProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload;
    },
    resetGame(state) {
      state.loadingProcess.status = STATUS.IDLE;
      state.gamePhase = GAME_PHASE.START;
      state.results = {};
      state.words = [];
      state.progress = 0;
      state.longestChain = 0;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(startGame.pending, (state) => {
        state.loadingProcess.status = STATUS.LOADING;
      })
      .addCase(startGame.fulfilled, (state) => {
        state.loadingProcess.status = STATUS.SUCCESS;
      })
      .addCase(startGame.rejected, (state, action) => {
        state.loadingProcess.status = STATUS.FAIL;
        state.loadingProcess.error = action.error.message || '';
      })
      .addCase(finishGame.pending, (state) => {
        state.loadingProcess.status = STATUS.LOADING;
      })
      .addCase(finishGame.fulfilled, (state) => {
        state.loadingProcess.status = STATUS.SUCCESS;
      })
      .addCase(finishGame.rejected, (state, action) => {
        state.loadingProcess.status = STATUS.FAIL;
        state.loadingProcess.error = action.error.message || '';
      })
    }
})

export const {
  setGameId,
  setWords,
  setGameGroup,
  setGamePhase,
  setGameSource,
  setGameResults,
  resetGame,
  toggleGameSound,
  toggleGameFullscreen,
  setGameProgress,
  setLongestChain,
  addGameResult,
} = gameSlice.actions;
