import { setGamePhase, GAME_PHASE, useTimer } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { GAME_COUNTDOWN } from 'shared/constants';

export const GameCountdown = () => {
  const dispatch: AppDispatch = useDispatch();
  const [ startTimer, stopTimer, timerCounter ] = useTimer(GAME_COUNTDOWN, -1);

  React.useEffect(() => {
    startTimer(() => {
      dispatch(setGamePhase(GAME_PHASE.PLAYING));
    })
    return () => {
      stopTimer()
    };
  }, [dispatch, startTimer, stopTimer]);

  return (
    <Box sx={{ position: "absolute", top: 0, height: "100%", width: 120, display: "flex", alignItems: "center" }}>
      <CircularProgress color="secondary" variant="determinate" value={(timerCounter / GAME_COUNTDOWN) * 100} size={120} thickness={2}/>
      <Typography variant="h5" sx={{
        position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 120, height: 120,
        lineHeight: "120px",
        fontWeight: 400,
        textAlign: "center",
        fontSize: "4rem",
        color: "secondary.main" }}>
        {timerCounter}
      </Typography>
    </Box>
  )
}
