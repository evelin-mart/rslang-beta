import React from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { AppDispatch, useAppSelector } from 'app/store';
import { UserLoginData } from 'shared/api/users';
import { submitForm } from 'entities/user';
import { defaultInputsState, defaulValidationState} from './model';
import { STATUS } from 'shared/constants';
import { PasswordFormControl } from 'shared/components/password';

export const LoginForm = () => {
  const [ inputsState, setInputsState ] = React.useState(defaultInputsState);
  const [ inputsErrors, setInputsErrors ] = React.useState(defaulValidationState);
  const { requestState, error } = useAppSelector((state) => state.user.formLoading);
  const loading = requestState.status === STATUS.LOADING;
  const errorText = requestState.error || error as string;
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(submitForm({...inputsState}));
  }

  const handleChange = (key: keyof UserLoginData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState({ ...inputsState, [key]: e.target.value });
    setInputsErrors({ ...inputsErrors, [key]: e.target.value === ''});
  }

  return (
    <Box
      sx={{ rowGap: 3, display: "flex", flexDirection: "column" }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {errorText && <Typography sx={{ color: "error.light" }}>
        {errorText}
      </Typography>}
      <TextField
        required
        type="email"
        label="Email"
        placeholder="Email"
        value={inputsState.email}
        onChange={handleChange('email')}
        error={inputsErrors.email}
      />
      <PasswordFormControl
        required={true}
        value={inputsState.password}
        error={inputsErrors.password}
        onChange={handleChange('password')}/>
      <LoadingButton
        type="submit"
        loading={loading}
        loadingPosition="center"
        startIcon={<LoginIcon />}
        variant="contained"
      >
        Вход
      </LoadingButton>
    </Box>
  )
}