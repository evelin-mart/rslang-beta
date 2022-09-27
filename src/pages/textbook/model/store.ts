import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { STATUS } from 'shared/constants';
import { Word } from 'entities/word';
import * as wordsApi from 'shared/api/words';
import {
  getAggregatedWordsOnPage,
  getHardAggregatedWords,
} from 'shared/api/users-aggregated-words';
import { AsyncThunkConfig } from 'app/store';
import { getLastSeenPage, initialState } from './interface';
import { UserWordAnswer } from 'shared/api/users-words';

export const getWords = createAsyncThunk<Word[], boolean, AsyncThunkConfig>(
  'words/getWords',
  async (isAuth, { getState }) => {
    const { page, group } = getState().textbook;
    return isAuth ? getAggregatedWordsOnPage({ page, group }) : wordsApi.getWords({ page, group });
  },
);

export const getHardWords = createAsyncThunk<[Word[], number], void, AsyncThunkConfig>(
  'words/getAggregatedWords',
  async (_, { getState }) => {
    const { page } = getState().textbook;
    return getHardAggregatedWords(page);
  },
);

export const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setGroup(state, action: PayloadAction<number>) {
      state.group = action.payload;
      state.page = getLastSeenPage(state.group)[1];
    },
    updateWord(state, action: PayloadAction<UserWordAnswer>) {
      const userWord = action.payload;
      state.words =
        state.group === 6
          ? state.words.filter((word) => word.id !== userWord.wordId)
          : state.words.map((word) =>
              word.id === userWord.wordId
                ? { ...word, userWord: { optional: userWord.optional } }
                : word,
            );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWords.pending, (state, _) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getWords.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.words = action.payload;
      })
      .addCase(getWords.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message || '';
      })
      .addCase(getHardWords.pending, (state, _) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getHardWords.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        [state.words, state.totalPages] = action.payload;
      })
      .addCase(getHardWords.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message || '';
      });
  },
});

export const { setPage, setGroup, updateWord } = textbookSlice.actions;
