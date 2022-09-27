export const MAX_ANSWERS = 5;
export const ANSWER_TIME = 5;

export enum BTN_STATE {
  IDLE = 'primary.main',
  SUCCESS = 'success.light',
  ERROR = 'error.light',
  DISABLED = 'grey.500',
}

export const defaultAnswersState: BTN_STATE[] = Array(MAX_ANSWERS).fill(BTN_STATE.IDLE);
export const disabledAnswersState: BTN_STATE[] = Array(MAX_ANSWERS).fill(BTN_STATE.DISABLED);