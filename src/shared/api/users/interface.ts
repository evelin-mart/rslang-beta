import { UserData } from "entities/user";

export type UserTokens = Pick<UserData, 'token' | 'refreshToken'>;

export interface UserLoginResult extends Omit<UserData, 'email'> {
  message: string;
  error: string | null;
}

export const defaultLoginResult: UserLoginResult = {
  token: '',
  refreshToken: '',
  message: '',
  userId: '',
  name: '',
  error: null,
}

export interface UserLoginData extends Pick<UserData, 'email'> {
  password: string;
}

export interface UserRegistrationError {
  error: {
    status: string;
    errors: { path: string, message: string }[];
  }
}

export interface UserRegistrationResult extends Pick<UserData, 'email' | 'name'> {
  id: string,
  error: UserRegistrationError | string | null;
}

export type UsetGetResult = Omit<UserRegistrationResult, "error">;

export const isUserRegistrationResult = (obj: unknown): obj is UserRegistrationResult => {
  const props = ['id', 'email', 'name'];
  return (
    obj !== null 
    && typeof obj === 'object' 
    && props.every((prop) => Object.prototype.hasOwnProperty.call(obj, prop))
  );
}

export const defaultRegistartionResult: UserRegistrationResult = {
  id: '',
  email: '',
  name: '',
  error: null,
}

export interface UserRegistrationData extends UserLoginData {
  name: string;
  avatarUrl?: string;
}

export const isUserRegistrationData = (obj: unknown): obj is UserRegistrationData => {
  return (
    obj !== null 
    && typeof obj === 'object' 
    && Object.prototype.hasOwnProperty.call(obj, 'name')
  );
}
