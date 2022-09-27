import { Box, Button, Paper, Typography } from '@mui/material';
import { AppDispatch } from 'app/store';
import { addGameResult, finishGame, GAME_PHASE, setGamePhase, setGameProgress, SOUND_EFFECT, useGame, useSoundEffect, useTimer } from 'entities/game/model';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLongestChain } from '../../model/hooks/longest-chain';
import { makeAbsUrl } from 'shared/constants';
import style from './index.module.scss'
import classNames from 'classnames';

const GAME_TIME = 30;

export const SprintGame = () => {
  
  const dispatch: AppDispatch = useDispatch();
  const { words } = useGame();

  const [word, setWord] = useState('');
  const [wordId, setWordId] = useState('');
  const [imgLink, setImgLink] = useState('');
  const [translate, setTranslate] = useState('');
  const [rightAnswer, setRightAnswer] = useState<null | boolean>(null)
  const [currentAnswer, setCurrentAnswer] = useState<null | { answer: boolean }>(null)
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [scoreCounter, setScoreCounter] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRight, setIsRight] = useState<boolean | null>(null);
  const [ playSoundEffect ] = useSoundEffect();
  const [ setLongestChain, chainCounter ] = useLongestChain();
  const [ startTimer, stopTimer, counter ] = useTimer(GAME_TIME, -1);

  const classes = classNames(style.base, {
    [style.right]: isRight === true,
    [style.wrong]: isRight === false,
  })  

  const getWrongAnswer = () => {
    const wrong = words.filter((item) => item !== words[currentWordIndex]);
    const index = Math.floor(Math.random() * wrong.length);
    return wrong[index];
  }

  const createCard = () => {
    if (!words[currentWordIndex]) {
      setIsGameOver(true);
      return
    }

    const roll = Math.random();
    setWord(words[currentWordIndex].word);
    setWordId(words[currentWordIndex].id);
    setImgLink(makeAbsUrl(words[currentWordIndex].image));
    
    if (roll < 0.5 || words.length <= 1) {
      setRightAnswer(true);
      setTranslate(words[currentWordIndex].wordTranslate);
    } else {
      setRightAnswer(false);
      setTranslate(getWrongAnswer().wordTranslate);
    }

  }

  const handleAnswer = () => {
    checkAnswer();
    if (currentWordIndex === words.length) {
      setIsGameOver(true);
      return;
    }
  }

  const checkAnswer = () => {

    if (currentAnswer?.answer === rightAnswer) {
      setIsRight(true);
      setScoreCounter((prev) => prev + (10 * (chainCounter === 0 ? 1 : chainCounter)));
      dispatch(addGameResult({ id: wordId, result: true }))
      setLongestChain((prev) => prev + 1);
      playSoundEffect(SOUND_EFFECT.RIGHT);
    } else {
      setIsRight(false);
      dispatch(addGameResult({ id: wordId, result: false }))
      setLongestChain(0)
      playSoundEffect(SOUND_EFFECT.WRONG);
    }
    setTimeout(() => setIsRight(null), 300);
  }

  React.useEffect(() => {
    if (isGameOver) {
      stopTimer();
      dispatch(setGamePhase(GAME_PHASE.LOADING));
      dispatch(finishGame());
    }
  }, [isGameOver, dispatch, stopTimer]);

  React.useEffect(() => {
    createCard();
    // eslint-disable-next-line
  }, [currentWordIndex]);

  React.useEffect(() => {
    if (currentAnswer !== null) {
      handleAnswer();
    }
    // eslint-disable-next-line
  }, [currentAnswer]);

  useEffect(() => {
    setCurrentWordIndex(0);
    startTimer(() => setIsGameOver(true));
  }, [words, startTimer])

  useEffect(() => {
    dispatch(setGameProgress((counter / GAME_TIME) * 100));
    return () => {
      dispatch(setGameProgress(0));
    }
  }, [counter, dispatch]);

  const handleBtnClick = React.useCallback((answer: boolean) => {
    setCurrentAnswer({ answer });
    setCurrentWordIndex((s) => s + 1);
  }, []);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (!e.repeat && e.code === 'ArrowRight') {
        handleBtnClick(false);
      }
      if (!e.repeat && e.code === 'ArrowLeft') {
        handleBtnClick(true);
      }
    };

    document.addEventListener('keydown', onKeyPress);

    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  }, [handleBtnClick]);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        flexBasis: {xs: 300, md: 400}, 
        pl: {xs: 1, md: 3},
        pr: {xs: 1, md: 3},
        display: "flex", 
        flexDirection: "column", 
        rowGap: 2, p: 4,
        height: "fit-content",
      }}
      className={classes}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"}, columnGap: 6, justifyContent: "space-between" }}>
              <Typography sx={{pt: 1}} variant='body1'>Chain length: 
                <Typography component="span" sx={{pl: 1}} variant='h5' color="primary">{chainCounter}</Typography>
              </Typography>
              <Typography sx={{pt: 1}} variant='body1'>Time left:
                <Typography component="span" sx={{pl: 1}} variant='h5' color="error">{counter}</Typography>
              </Typography>
            </Box>
            <Box
              component="img"
              sx={{
                mt: 1,
                mb: 1,
                width: 350,
                maxWidth: { xs: 250, md: 350 },
                objectFit: "cover",
                height: 150,
              }}
              alt="Word illustration"
              src={imgLink || ''}
            />
            <Typography variant='h4'color={'green'}>{scoreCounter}</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", columnGap: 2, justifyContent: "center", alignItems: 'center' }}>
              <Typography align='center' color='secondary' variant='h4'>{word}</Typography>
              <Typography sx={{pt: 1}} variant='body2'>is mean</Typography>
              <Typography align='center' color='secondary' variant='h4'>{translate}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"}, columnGap: 6, justifyContent: "center" }}>
              <Button variant="contained" color="success" sx={{ mt: 1, pl: 5, pr: 5, textTransform: "none" }} startIcon={<ArrowBackIcon />} onClick={() => {handleBtnClick(true)}}>True!</Button>
              <Button variant="contained" color="error" sx={{ mt: 1, pl: 5, pr: 5, textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => {handleBtnClick(false)}}>False!</Button>
            </Box>
          </Box>
    </Paper>
  )
}

