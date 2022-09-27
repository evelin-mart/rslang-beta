
import React from 'react';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { Box, IconButton, Typography, Card, CardMedia, Zoom, CardContent, Fab, CircularProgress } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { makeAbsUrl } from 'shared/constants';

type AudiocallWordCardProps = {
  nextButtonState: 'next' | 'skip';
  word: AggregatedWord;
  canPlayWordAudio: boolean;
  playSound: (soundUrl: string) => void;
  timerCounter: number;
}

export const AudiocallWordCard = ({ nextButtonState, word, canPlayWordAudio, playSound, timerCounter }: AudiocallWordCardProps) => {

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      position: "relative",
      height: { xs: 200, sm: 250 },
      pb: { xs: 1, sm: 0 } 
    }}>
      <Zoom in={nextButtonState === 'next'}>
        <Card sx={{ position: "absolute", top: 0, width: 250, pb: { xs: 1, sm: 0 }  }}>
          <Fab
            disabled={!canPlayWordAudio}
            size="small"
            sx={{ position: "absolute", right: 16, top: 16 }}
            color="secondary"
            onClick={() => playSound(word.audio)}>
            <VolumeUpIcon />
          </Fab>
          <CardContent>
            <Typography variant="h5" component="div">
              {word.word}
            </Typography>
            <Typography color="text.secondary">
              {word.transcription}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ height: { xs: 90, sm: 150 }, width: { xs: 150, sm: 250 }, margin: "0 auto" }}
            image={makeAbsUrl(word.image)}
            alt={word.word}
          />
        </Card>
      </Zoom>
      <Zoom in={nextButtonState === 'skip'}>
        <Box sx={{ position: "absolute", top: 0, height: "100%", width: 120, display: "flex", alignItems: "center" }}>
          <CircularProgress color="info" variant="determinate" value={(timerCounter / 5) * 100} size={120} thickness={2}/>
          <IconButton
            sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 120, height: 120 }}
            disabled={!canPlayWordAudio}
            color="info"
            onClick={() => playSound(word.audio)}>
            <VolumeUpIcon sx={{width: 80, height: 80 }}/>
          </IconButton>
        </Box>
      </Zoom>
    </Box>
  )
}
