import React from 'react';
import { Box, Button } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { toggleAuthModal } from 'pages/user/auth-modal/model';
import { useUser, resetForm } from 'entities/user';
import { PopupMenu } from './popup-menu';


export const UserToolbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useUser();

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(resetForm());
    dispatch(toggleAuthModal(true));
  };

  return (
    <Box sx={{ color: "primary.contrastText" }}>
      {!user.isAuthorized
        ? <Button
            onClick={handleOpenModal}
            aria-label="Войти"
            variant="outlined"
            endIcon={<LoginIcon />}
            sx={{
              color: "primary.contrastText",
              textTransform: "none",
              fontWeight: 400,
              fontSize: "1rem"
            }}>
            Войти
          </Button>
        : <PopupMenu />}
    </Box>
  );
}
