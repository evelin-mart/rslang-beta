import {
  UserDailyStats,
  gameStatsKeys,
  GameStatistics,
  defaultGameStatistics
} from 'shared/api/users-statistics';
import { GAME } from 'shared/constants';
import { games } from 'shared/constants/games';

export const getWordsStats = (stats: UserDailyStats) => {
  const newWords = gameStatsKeys.reduce((acc, key) => {
    return stats[key] ? acc + (stats[key] as GameStatistics)[0] : acc
  }, 0);
  const percents = gameStatsKeys
    .map((key) => stats[key] ? (stats[key] as GameStatistics)[1] : 0)
    .filter((el) => el !== 0);
  const averagePercent = percents.reduce((acc, el) => acc + el, 0) / percents.length;
  return [
    { title: 'Новых слов', value: newWords},
    { title: 'Изученных слов', value: +stats.lw},
    { title: 'Правильных ответов', value: `${averagePercent}%`},  
  ];
}

export const getGameStats = (stats: UserDailyStats, gameId: GAME) => {
  const { statsKey } = games[gameId];
  const [newWords, percent, chain] = (stats[statsKey] as GameStatistics) || defaultGameStatistics;
  return [
    { title: 'Новых слов', value: newWords},
    { title: 'Самая длинная серия', value: chain},
    { title: 'Правильных ответов', value: `${percent}%`},
  ]
}