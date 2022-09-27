import { useGameResults } from 'entities/game';
import { Box, Typography, useTheme, Link } from '@mui/material';
import React from 'react';
import styles from '../../styles';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getResultTitle, TAB } from '../../model';

interface GameResultsProps {
  setTabValue: (tabValue: TAB) => void;
}

export const GameResultsChart = ({ setTabValue }: GameResultsProps) => {
  const { palette: { error, success } } = useTheme();
  const { correctWords, failedWords } = useGameResults();

  const wordsNumber = failedWords.length + correctWords.length;
  const correctWordsPercent = wordsNumber !== 0 ? Math.round((correctWords.length / wordsNumber) * 100) : 0;
  const resultTitle = getResultTitle(correctWordsPercent);

  const data = [
    { name: 'Right', value: correctWordsPercent },
    { name: 'Wrong', value: 100 - correctWordsPercent },
  ];

  const dataColors = [success.light, error.light];

  return (
    <Box sx={styles.chartTab}>
      <Typography variant="h5" sx={styles.title}>
        {resultTitle} 
      </Typography>
      <Typography variant="subtitle2">
        <Link sx={styles.subtitleLink} onClick={() => setTabValue(TAB.WORDS)}>
          Верных ответов: {correctWords.length}, ошибок: {failedWords.length}
        </Link>
      </Typography>
      <Box sx={styles.pieChart}>
        <Box sx={styles.percentBox}>
          <Typography component="div" sx={styles.percentBoxText}>
            {correctWordsPercent}%
          </Typography>
        </Box>
        <ResponsiveContainer width={"99%"} height={"100%"}>
          <PieChart>
            <Pie
              animationDuration={600}
              data={data}
              innerRadius={70}
              outerRadius={80}
              paddingAngle={(correctWordsPercent === 100 || correctWordsPercent === 0) ? 0 : 3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={dataColors[index % dataColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}
