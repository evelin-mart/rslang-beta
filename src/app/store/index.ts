import { configureStore } from '@reduxjs/toolkit';
import { textbookSlice } from 'pages/textbook/model';
import { authModalSlice } from 'pages/user/auth-modal/model';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { userSlice, saveDataToStoreMiddleware, loadUserFromStorage } from 'entities/user';
import { saveTokensMiddleware } from 'shared/api/lib';
import { gameSlice } from 'entities/game';
import { appUiSlice } from 'shared/lib/store/ui';

export const store = configureStore({
  reducer: {
    [textbookSlice.name]: textbookSlice.reducer,
    [authModalSlice.name]: authModalSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [gameSlice.name]: gameSlice.reducer,
    [appUiSlice.name]: appUiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      saveTokensMiddleware, 
      saveDataToStoreMiddleware
    )
  }
});

store.dispatch(loadUserFromStorage());

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;

export interface AsyncThunkConfig {
  dispatch: AppDispatch,
  state: RootState,
}
