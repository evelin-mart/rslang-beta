import { resetGame, toggleGameFullscreen, toggleGameSound, useGame } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Grid, Tooltip, LinearProgress } from '@mui/material';
import React from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export const GameInterface = ({ children }: React.PropsWithChildren) => {
  const dispatch: AppDispatch = useDispatch();
  const { isSound, isFullscreen, progress } = useGame();
  const navigate = useNavigate();

  const handleToTextbookClick = () => {
    dispatch(resetGame());
    navigate('/textbook', { replace: true });
  }
  
  const handleSoundClick = () => {
    dispatch(toggleGameSound());
  }

  const handleFullScreenClick = () => {
    dispatch(toggleGameFullscreen());
  }

  React.useEffect(() => {
    if (isFullscreen && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  return (
    <Grid sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <LinearProgress color="secondary" variant="determinate" value={progress} sx={{ height: 8, position: "fixed", bottom: 0, left: 0, width: "100vw" }}/>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Tooltip title="Звук">
          <IconButton onClick={handleSoundClick} color="secondary">
            {isSound ? <MusicNoteIcon /> : <MusicOffIcon sx={{ color: "grey.500"}}/>}
          </IconButton >
        </Tooltip>
        <Tooltip onClick={handleFullScreenClick} title="На весь экран">
          <IconButton color="secondary">
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Вернуться в учебник">
          <IconButton onClick={handleToTextbookClick} color="secondary">
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, mt: { xs: 0, sm: 3 } }}>
        {children}
      </Box>
    </Grid>
  )
}
