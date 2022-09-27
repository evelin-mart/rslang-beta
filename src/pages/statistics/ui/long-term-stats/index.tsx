
import React from 'react';
import { UserStatistics } from "shared/api/users-statistics"
import { Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { getWordsStats } from 'pages/statistics/model';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

type LongTermStatsProps = {
  stats: UserStatistics | Error
}

export const LongTermStats = ({ stats }: LongTermStatsProps) => {
  const theme = useTheme();
  const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const { palette } = theme;

  if (stats instanceof Error) {
    return <Typography variant="body1" color="info.main">Статистики пока нет</Typography>;
  }
  
  let learnedWordsSum = 0;
  const data = Object.keys(stats.optional).map((date) => {
    const wordsStatsOnDate = getWordsStats(stats.optional[date]);
    const [ day, mounth ] = date.split('-').reverse();
    const learned = +wordsStatsOnDate[1].value;
    const prevLearned = learnedWordsSum;
    learnedWordsSum += learned;
    return {
      name: `${day}/${mounth}`,
      newWords: wordsStatsOnDate[0].value,
      learnedWords: learned,
      prevDayLearnedWords: prevLearned,
      learnedOverall: learnedWordsSum,
    }
  });

  const barSize = smMatches ? 20 : 10;
  return (
    <Box sx={{ flexBasis: 700 }}>
      <Box>
        <ResponsiveContainer minWidth={250} width={"99%"} height={smMatches ? 400 : 300}>
          <ComposedChart data={data} margin={{top: 0, left: 0, right: 0, bottom: 0}} style={{ left: "-20px"}}>
            <CartesianGrid stroke={palette.grey[400]} />
            <XAxis dataKey="name" tickMargin={5}/>
            <YAxis />
            <Tooltip />
            <Legend payload={[{ value: 'Новых слов в день', type: 'line' }]} color={palette.info.dark} align="right"/>
            <Bar dataKey="newWords" name="Новые слова" barSize={barSize} fill={palette.info.dark} />
            <Line dataKey="newWords" type="monotone" name="Новые слова" stroke={palette.warning.main} />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ mt: 4 }}>
        <ResponsiveContainer minWidth={250} width={"99%"} height={smMatches ? 400 : 300} >
          <ComposedChart data={data} margin={{top: 0, left: 0, right: 0, bottom: 0}} style={{ left: "-20px"}}>
            <CartesianGrid stroke={palette.grey[400]} />
            <XAxis dataKey="name" tickMargin={5}/>
            <YAxis />
            <Tooltip />
            <Legend payload={[{ value: 'Увеличение общего количества изученных слов в день', type: 'line' }]} align="right"/>
            <Bar
              stackId="learned"
              dataKey="prevDayLearnedWords"
              name="Изученные до этого дня"
              barSize={barSize} fill={palette.info.dark} />
            <Bar
              stackId="learned"
              dataKey="learnedWords"
              name="Изученные на сегодня"
              barSize={barSize}>
              {data.map((entry, key) => (
                <Cell key={key} fill={entry.learnedWords < 0 ? palette.error.light : palette.info.light }/>
              ))}
            </Bar>
            <Line dataKey="learnedOverall" type="monotone" name="Всего изучено" stroke={palette.warning.main} />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}
