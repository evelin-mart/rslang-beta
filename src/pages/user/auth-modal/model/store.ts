import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FormType = 'login' | 'registration';

interface AuthModalState {
  show: boolean;
  formType: FormType;
}

const initialState: AuthModalState = {
  show: false,
  formType: 'login',
}

export const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    toggleAuthModal(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
      if (!state.show) {
        state.formType = 'login';
      }
    },
    setFormType(state, action: PayloadAction<FormType>) {
      state.formType = action.payload;
    }
  },
})

export const { toggleAuthModal, setFormType } = authModalSlice.actions;