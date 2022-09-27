import { List, ListItem, Typography, IconButton } from '@mui/material';
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styles from '../../styles';
import React from 'react';

type WordsListProps = {
  words: AggregatedWord[];
  playSound: (audioUrlPath: string) => void;
  isPlaying: boolean;
}

export const ResultsWordsList = ({ words, playSound, isPlaying }: WordsListProps) => {
  const listItems = words.map((word, i) => {
    return (
      <ListItem key={`${word.id}${i}`} sx={{ p: 0, mb: 1 }} >
        <IconButton
          disabled={isPlaying}
          size="small"
          onClick={() => playSound(word.audio)}
          sx={styles.playButton}>
          <VolumeUpIcon />
        </IconButton>
        <Typography component="span">
          {word.word} 
        </Typography>
        <Typography component="span" sx={{ color: "grey.500"}}>
          &nbsp;–&nbsp;{word.wordTranslate}
        </Typography>
      </ListItem>
    );
  });

  return (
    <List sx={{ p: 0 }}>
      {listItems}
    </List>
  )
}
