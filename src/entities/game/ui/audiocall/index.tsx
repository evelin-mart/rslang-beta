import React from 'react';
import { GAME_PHASE, setGamePhase, finishGame, addGameResult, useSoundEffect, SOUND_EFFECT, useSound, useTimer } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Grid, Button, Typography, Fade } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useKeyboard, usePlayingWord } from './model';
import { ANSWER_TIME, BTN_STATE, defaultAnswersState, disabledAnswersState } from './model/config';
import { useLongestChain } from 'entities/game';
import styles from './styles';
import { AudiocallWordCard } from './ui';

export const AudiocallGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const [ playingWord, setNextPlayingWord, isEndGame ] = usePlayingWord();
  const [ answerButtonsState, setAnswerButtonsState ] = React.useState<BTN_STATE[]>(defaultAnswersState);
  const [ nextButtonState, setNextButtonState ] = React.useState<'skip' | 'next'>('skip');
  const [ setChainCounter ] = useLongestChain();
  const [ playSoundEffect ] = useSoundEffect();
  const [ playSound, { stopSound, canPlay } ] = useSound();
  const answerButtons = React.useRef<(HTMLButtonElement | null)[]>([]);
  const nextBtn = React.useRef<HTMLButtonElement | null>(null);
  useKeyboard(answerButtons, nextBtn, playingWord);
  const [ startTimer, stopTimer, timerCounter ] = useTimer(ANSWER_TIME);

  const handleSkipWord = React.useCallback(() => {
    stopTimer();
    playSoundEffect(SOUND_EFFECT.WRONG);
    setNextButtonState('next');
    if (playingWord !== null) {
      const { id } = playingWord.word;
      const newButtonsState = [ ...disabledAnswersState ];
      newButtonsState[playingWord.rightAnswerIndex] = BTN_STATE.ERROR;
      setAnswerButtonsState(newButtonsState);
      setChainCounter(0);
      dispatch(addGameResult({ id, result: false }));
    }
  }, [stopTimer, dispatch, playingWord, setChainCounter, playSoundEffect]);

  React.useEffect(() => {
    if (playingWord !== null) {
      playSound(playingWord.word.audio);
      startTimer(handleSkipWord);
    }
    return () => {
      playingWord !== null && stopSound();
    }
  }, [playingWord, playSound, stopSound, startTimer, handleSkipWord]);

  React.useEffect(() => {
    if (isEndGame) {
      dispatch(setGamePhase(GAME_PHASE.LOADING));
      dispatch(finishGame());
    }
  }, [isEndGame, dispatch]);

  const handleNextWord = React.useCallback(() => {
    setNextButtonState('skip');
    setAnswerButtonsState(defaultAnswersState);
    setNextPlayingWord();
  }, [setNextPlayingWord]);

  const handleGuessWord = React.useCallback((guessWordId: string, btnRefIndex: number) => {
    if (nextButtonState === 'next') return;
    stopTimer();
    setNextButtonState('next');
    if (playingWord !== null) {
      const { id } = playingWord.word;
      const result = guessWordId === id;
      dispatch(addGameResult({ id, result }));
      const newButtonsState = [ ...disabledAnswersState ];
      if (result) {
        playSoundEffect(SOUND_EFFECT.RIGHT);
        setChainCounter((prev) => prev + 1);
        newButtonsState[btnRefIndex] = BTN_STATE.SUCCESS;
      } else {
        playSoundEffect(SOUND_EFFECT.WRONG);
        setChainCounter(0);
        newButtonsState[btnRefIndex] = BTN_STATE.ERROR;
        newButtonsState[playingWord.rightAnswerIndex] = BTN_STATE.SUCCESS;
      }
      setAnswerButtonsState(newButtonsState);
    }
  }, [dispatch, playingWord, stopTimer, setChainCounter, playSoundEffect, nextButtonState])

  return (
    <Grid sx={styles.gameContainer}>
      {playingWord !== null && 
        <AudiocallWordCard
          timerCounter={timerCounter}
          nextButtonState={nextButtonState}
          word={playingWord.word}
          canPlayWordAudio={canPlay}
          playSound={playSound}/>}
      <Box sx={styles.answersContainer}>
        {playingWord?.answers.map(({ translation, wordId }, i) => (
          <Button
            onClick={() => handleGuessWord(wordId, i)}
            ref={(el) => answerButtons.current[i] = el}
            key={i}
            sx={[
              styles.answerButton,
              {
                color: answerButtonsState[i],
                pointerEvent: nextButtonState === 'next' ? 'none' : 'all',
              }
            ]}>
            <Typography component="span" sx={{ width: 30, display: "inline-flex", justifyContent: "center" }}>
              {answerButtonsState[i] === BTN_STATE.SUCCESS && <Fade in={true}><TaskAltIcon /></Fade>}
              {answerButtonsState[i] === BTN_STATE.ERROR && <Fade in={true}><ErrorOutlineIcon /></Fade>}
              {(answerButtonsState[i] === BTN_STATE.IDLE || answerButtonsState[i] === BTN_STATE.DISABLED) && 
                <Typography component="span" sx={{ 
                  pr: 1, pl: 1, mr: 0.5, borderRadius: "3px",
                  borderWidth: 1, 
                  borderStyle: "solid", 
                  borderColor: answerButtonsState[i] }}>
                  {i + 1}
                </Typography>}
            </Typography>
            &nbsp;{translation}
          </Button>
        ))}
      </Box>
      <Box sx={styles.nextButton}>
        {nextButtonState === 'skip'
          ? <Button 
              disabled={!canPlay} 
              size="large" 
              ref={nextBtn} 
              onClick={handleSkipWord} 
              variant="outlined" 
              color="warning" 
              sx={{ width: 150 }}
              endIcon={<SkipNextIcon />}>
              Не знаю!
            </Button>
          : <Button
              size="large"
              ref={nextBtn}
              onClick={handleNextWord}
              variant="outlined"
              color="secondary"
              sx={{ width: 150 }}
              endIcon={<ArrowForwardIcon />}>
              Дальше
            </Button>
        }
      </Box>
    </Grid>
  )
}
