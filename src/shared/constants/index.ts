export const baseUrl = 'https://react-learnwords-jsfe2022.herokuapp.com';

export const TOTAL_GROUPS = 6;
export const TOTAL_WORDS = 3600;
export const WORDS_PER_PAGE = 20;
export const MAX_PAGE = TOTAL_WORDS / TOTAL_GROUPS / WORDS_PER_PAGE - 1;
export const LEARN_CHAIN = 3;
export const GAME_COUNTDOWN = 3;

export const makeAbsUrl = (url: string) => `${baseUrl}/${url}`;

export enum STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'succeeded',
  FAIL = 'failed',
}

export enum PAGES {
  MAIN = 'main',
  TEXTBOOK = 'textbook',
  STATISTICS = 'statistics',
  GAME = 'game',
  AUTH = 'auth',
  NOT_FOUND = 'not-found',
  PROFILE = 'profile',
}

export enum GAME {
  AUDIO = 'audio',
  SPRINT = 'sprint',
}

export type MyColor = "error" | "primary" | "inherit" | "success" | "secondary" | "info" | "warning" | undefined;

export type Sound = HTMLAudioElement | null;
