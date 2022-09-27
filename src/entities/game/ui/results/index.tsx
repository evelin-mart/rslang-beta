import { useGameResults, resetGame, useSound, useGame } from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, Divider, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import { GameResultsChart, ResultsWordsList, TabPanel } from './ui';
import { GameInformationWrapper } from '../info-wrapper';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import { TAB } from './model';
import PieChartIcon from '@mui/icons-material/PieChart';
import ListIcon from '@mui/icons-material/List';
import { games } from 'shared/constants/games';

export const GameResults = () => {
  const { gameId } = useGame();
  const dispatch: AppDispatch = useDispatch();
  const [ playSound, { isPlaying } ] = useSound();
  const { correctWords, failedWords } = useGameResults();
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(TAB.GRAPH);

  const handleTabChange = (_: React.SyntheticEvent, newValue: TAB) => {
    setTabValue(newValue);
  };

  const handleReplay = () => {
    dispatch(resetGame());
  }

  const handleTextbookClick = () => {
    dispatch(resetGame());
    navigate('/textbook', { replace: true });
  }

  const showDivider = correctWords.length !== 0 && failedWords.length !== 0;
  const isResultsEmpty = correctWords.length === 0 && failedWords.length === 0;

  return (
    <GameInformationWrapper>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h2" sx={styles.resultsTitle}>{gameId && games[gameId].title}</Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          sx={styles.tabsStyle}
        >
          <Tab sx={styles.tabStyle} icon={<PieChartIcon />} value={TAB.GRAPH} />
          <Tab sx={styles.tabStyle} icon={<ListIcon />} value={TAB.WORDS} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={TAB.GRAPH}>
        <GameResultsChart setTabValue={setTabValue} />
      </TabPanel>
      <TabPanel value={tabValue} index={TAB.WORDS}>
        <Box sx={styles.wordsList}>
          {isResultsEmpty && <Typography variant="body1" sx={{ textAlign: "center" }}>Результатов нет</Typography>}
          {failedWords.length !== 0 &&
            <>
              <Typography variant="body2" sx={[{ color: "error.light" }, styles.answersRow]}>
                <ErrorOutlineIcon fontSize="small" /> ошибок: {failedWords.length}
              </Typography>
              <ResultsWordsList words={failedWords} playSound={playSound} isPlaying={isPlaying} />
            </>}
          {showDivider && <Divider sx={{ width: "50%", mb: 1 }} />}
          {correctWords.length !== 0 &&
            <>
              <Typography variant="body2" sx={[{ color: "success.light" }, styles.answersRow]}>
                <TaskAltIcon fontSize="small" /> верных ответов: {correctWords.length}
              </Typography>
              <ResultsWordsList words={correctWords} playSound={playSound} isPlaying={isPlaying} />
            </>}
        </Box>
      </TabPanel>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          size={!smMatches ? "small" : "medium"}
          onClick={handleTextbookClick}
          variant="outlined"
          color="secondary">
          Учебник
        </Button>
        <Button 
          size={!smMatches ? "small" : "medium"}
          onClick={handleReplay}
          variant="outlined" 
          color="secondary">
          Сыграть еще раз
        </Button>
      </Box>
    </GameInformationWrapper>
  )
}
