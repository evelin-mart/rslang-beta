import React from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { useUser, submitForm, deleteUser } from 'entities/user';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Refresh as RefreshIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as usersApi from 'shared/api/users';
import { LoadingButton } from '@mui/lab';
import { AvatarUpload, FormErrors, AvatarUrl } from 'features/user/registration/ui';
import { PasswordFormControl } from 'shared/components/password';
import { PAGES, STATUS } from 'shared/constants';
import { useUserData } from './lib';
import { defaultInputsState } from './model';

export const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: { avatarUrl } } = useUser();
  const [ avatarUrlUpdated, setAvatarUrl ] = React.useState<AvatarUrl>(avatarUrl || null);
  const [ inputsState, setInputsState ] = React.useState<usersApi.UserRegistrationData>(defaultInputsState);
  const { requestState, error } = useAppSelector((state) => state.user.formLoading);

  const setData = React.useCallback(
    ({ name, email }: usersApi.UsetGetResult) => setInputsState({ password: '', name, email }),
    []
  );

  const [ userDataLoading ] = useUserData(setData);

  const submitLoading = requestState.status === STATUS.LOADING;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = avatarUrlUpdated && !(avatarUrlUpdated instanceof Error)
      ? {...inputsState, avatarUrl: avatarUrlUpdated }
      : {...inputsState };
    dispatch(submitForm(data));
  };

  const handleChange = (key: keyof usersApi.UserRegistrationData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputsState({ ...inputsState, [key]: e.target.value });
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser());
  }
  

  const errorText = error
    ? typeof error === 'string'
      ? error
      : <FormErrors errors={error.error.errors}/>
    : error;

  return (
    <Page pageName={PAGES.PROFILE}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {userDataLoading instanceof Error
          ? <Typography color="error">Ошибка загрузки данных</Typography>
          : userDataLoading && <CircularProgress />}
        {!userDataLoading &&
          <Box
            sx={{ flexBasis: 400, rowGap: 3, display: "flex", flexDirection: "column" }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <AvatarUpload avatarUrl={avatarUrlUpdated} setAvatarUrl={setAvatarUrl}/>
            {avatarUrlUpdated instanceof Error && <Typography sx={{ color: "error.light" }}>
              Uploading avatar error
            </Typography>}
            {errorText && <Typography sx={{ color: "error.light" }}>
              {errorText}
            </Typography>}
            <TextField
              type="text"
              label="Name"
              placeholder="Name"
              value={inputsState.name}
              onChange={handleChange('name')}
            />
            <TextField
              type="email"
              label="Email"
              placeholder="Email"
              value={inputsState.email}
              onChange={handleChange('email')}
            />
            <PasswordFormControl
              required={false}
              value={inputsState.password}
              onChange={handleChange('password')}/>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button 
                disabled={submitLoading} 
                variant="outlined" 
                color="error" 
                startIcon={<DeleteIcon />}
                onClick={handleDeleteUser}
              >
                Удалить
              </Button>
              <LoadingButton
                type="submit"
                loading={submitLoading}
                loadingPosition="center"
                startIcon={<RefreshIcon />}
                variant="contained"
              >
                Обновить
              </LoadingButton>
            </Box>
          </Box>}
      </Box>
    </Page>
  )
}
