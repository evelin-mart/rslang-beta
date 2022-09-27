import * as usersApi from 'shared/api/users';

export const defaultInputsState: usersApi.UserRegistrationData = {
  name: '',
  email: '',
  password: '',
}

export interface ValidationState {
  name: boolean;
  email: boolean;
  password: boolean;
}

export const defaulValidationState: ValidationState = {
  name: false,
  email: false,
  password: false,
}