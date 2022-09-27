import { baseUrl } from 'shared/constants';
import {
  UserLoginResult,
  UserLoginData,
  UserTokens,
  UserRegistrationResult,
  UserRegistrationData, 
  UsetGetResult} from './interface';
import { processRequest, processAuthorizedRequest, withToken } from '../lib';
import { UserData } from 'entities/user';

export const usersUrl = `${baseUrl}/users`;
const urlSignIn = `${baseUrl}/signin`;

export const loginUser = async (userData: UserLoginData) => {
  return await processRequest<UserLoginResult>(urlSignIn, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  });
}

export const getUserTokens = async (userId: string, refreshToken: string) => {
  return await processRequest<UserTokens>(
    `${usersUrl}/${userId}/tokens`, 
    withToken(refreshToken)
  );
}

export const createUser = async (userData: UserRegistrationData) => {
  return await processRequest<UserRegistrationResult>(usersUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
  })
}

export const getUser = async () => {
  return await processAuthorizedRequest<UsetGetResult>();
}

export const updateUser = async (userData: Partial<UserData>) => {
  return await processAuthorizedRequest<UserRegistrationResult>({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userData),
  });
}

export const deleteUser = async () => {
  return await processAuthorizedRequest<void>({
    method: 'DELETE',
  });
}
