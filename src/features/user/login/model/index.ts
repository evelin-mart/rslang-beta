import { UserLoginData } from "shared/api/users";

export const defaultInputsState: UserLoginData = {
  email: '',
  password: '',
}

export interface ValidationState {
  email: boolean;
  password: boolean;
}

export const defaulValidationState: ValidationState = {
  email: false,
  password: false,
}
