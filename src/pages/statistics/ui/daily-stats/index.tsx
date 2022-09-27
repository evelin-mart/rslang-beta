
import React from 'react';
import { UserStatistics } from "shared/api/users-statistics"
import { Typography, Box } from '@mui/material';
import { GAME } from 'shared/constants';
import { games } from 'shared/constants/games';
import { StatsItem } from '../stats-item';
import { getGameStats, getWordsStats } from 'pages/statistics/model';
import { dateToJson } from 'shared/lib';

type DailyStatsProps = {
  stats: UserStatistics | Error
}

export const DailyStats = ({ stats }: DailyStatsProps) => {
  const date = dateToJson(new Date());

  if (stats instanceof Error || stats.optional[date] === undefined) {
    return <Typography variant="body1" color="info.main">Статистики за сегодня ({date}) пока нет</Typography>;
  }

  const gamesStatsRendered = Object.keys(games).map((gameId) => {
    const dataRows = getGameStats(stats.optional[date], gameId as GAME);
    const hasStats = dataRows.reduce((acc, { value }) => acc + parseInt(String(value)), 0) !== 0;
    if (!hasStats) return null;
    return (
      <StatsItem
        key={gameId}
        title={games[gameId as GAME].title}
        rows={dataRows} />
    )
  });

  return (
    <Box sx={{
      display: "flex",
      columnGap: 3,
      rowGap: 3,
      flexWrap: "wrap",
      justifyContent: "center" 
    }}>
      <StatsItem
        key={'words'}
        title={"Слова"}
        rows={getWordsStats(stats.optional[date])} />
      {gamesStatsRendered}
    </Box>
  )
}