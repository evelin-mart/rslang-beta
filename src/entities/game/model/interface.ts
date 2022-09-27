import { GAME } from "shared/constants";
import { AggregatedWord } from 'shared/api/users-aggregated-words';
import { LoadingState, defaultLoadingState } from 'shared/lib/store';

export enum GAME_PHASE {
  START = 'start',
  COUNTDOWN = 'countdown',
  PLAYING = 'playing',
  RESULTS = 'results',
  LOADING = 'loading',
}

export type GameResultsData = Record<string, boolean>;
export type GameStats = { results: GameResultsData, longestChain: number };

export type GameSource = 'headerMenu' | 'textbook';

export interface GameState {
  gameId: GAME | null;
  gamePhase: GAME_PHASE;
  group: number;
  words: AggregatedWord[];
  isSound: boolean;
  isFullscreen: boolean;
  source: GameSource;
  results: GameResultsData;
  longestChain: number;
  loadingProcess: LoadingState;
  progress: number;
}

export const initialState: GameState = {
  gameId: null,
  gamePhase: GAME_PHASE.START,
  group: 0,
  words: [],
  isSound: true,
  isFullscreen: false,
  source: 'headerMenu',
  results: {},
  longestChain: 0,
  loadingProcess: defaultLoadingState,
  progress: 0,
}
