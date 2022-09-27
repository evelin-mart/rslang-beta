import { GAME } from 'shared/constants';
import { games } from 'shared/constants/games';

//                           [new,  progress, chain ]
export type GameStatistics = [number, number, number];

export const defaultGameStatistics = [0, 0, 0];

export const gameStatsKeys = Object.keys(games).map((game) => {
 return games[game as GAME].statsKey;
});

export type GameStatsKey = typeof gameStatsKeys[number];

export type UserDailyStats = {
  [x: GameStatsKey | 'lw']: GameStatistics | number,
}

export interface UserStatistics {
  learnedWords?: number,
  optional: {
    [x: string]: UserDailyStats
  }
}

export interface UserStatisticsResponse extends UserStatistics{
  id?: string,
}

export const defaultUserDailyStats: UserDailyStats = {
  ...gameStatsKeys.reduce((acc, key) => ({ ...acc, [key]: [...defaultGameStatistics] }), {}),
  lw: 0,
}

export const defaultUserStatistics: UserStatistics = {
  // learnedWords: 0,
  optional: {}
}
