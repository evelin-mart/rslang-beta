import { STATUS } from "shared/constants";

export interface LoadingState {
  status: STATUS;
  error: string | null;
}

export const defaultLoadingState: LoadingState = {
  status: STATUS.IDLE,
  error: null,
}