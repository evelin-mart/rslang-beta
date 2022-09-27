import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from 'app/store';

interface UiState {
  isBodyOverflow: boolean;
}

const initialState: UiState = {
  isBodyOverflow: false,
}

export const appUiSlice = createSlice({
  name: 'appUi',
  initialState,
  reducers: {
    setBodyOverflow(state, action: PayloadAction<boolean>) {
      state.isBodyOverflow = action.payload;
    },
  },
});

export const { setBodyOverflow } = appUiSlice.actions;

export const useUi = () => useAppSelector((state) => state.appUi);