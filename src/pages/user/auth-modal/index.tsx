import React from 'react';
import { LoginForm } from 'features/user/login';
import { Modal } from '@mui/material';
import { useAppSelector, AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { RegistrationForm } from 'features/user/registration';
import { FormWrapper } from './ui';
import { setFormType, formData, FormType, toggleAuthModal } from './model';
import { resetForm } from 'entities/user';
import { STATUS } from 'shared/constants';

const modalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  p: 2,
};

export const AuthModal = () => {
  const { show, formType } = useAppSelector((state) => state.authModal);
  const dispatch: AppDispatch = useDispatch();
  const { requestState } = useAppSelector((state) => state.user.formLoading);
  const loading = requestState.status === STATUS.LOADING;
  const { title, buttonText } = formData[formType];

  const handleClose = () => {
    dispatch(toggleAuthModal(false));
  }

  const handleBottomButtonClick = () => {
    const newFormType: FormType = formType === 'login'
      ? 'registration'
      : 'login';
    dispatch(setFormType(newFormType));
    dispatch(resetForm());
  }

  return (
    <Modal
        sx={modalStyles}
        open={show}
        onClose={handleClose}
      >
      <>
        <FormWrapper
          loading={loading}
          handleButtonClick={handleBottomButtonClick}
          title={title}
          buttonText={buttonText}>
          {formType === 'login'
            ? <LoginForm />
            : <RegistrationForm />}
        </FormWrapper>
      </>
    </Modal>
  )
}
