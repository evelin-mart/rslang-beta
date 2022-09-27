import { Middleware } from '@reduxjs/toolkit';
import { updateTokens, UserData } from 'entities/user';
import { getUserTokens, usersUrl } from '../users';
import { store } from 'app/store';
import { deauthorize } from 'entities/user';
import { HttpError } from './errors';

const authorizationErrors = [401, 402, 403];
let authorizedUserData: UserData;

export const saveTokensMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === 'user/authorize') {
    const user = action.payload as UserData;
    authorizedUserData = user;
  } else if (action.type === 'user/updateTokens') {
    authorizedUserData = { ...authorizedUserData, ...action.payload };
  }

  return next(action);
}

export const withToken = (token: string, requestInit: RequestInit = {}) => {
  return { ...requestInit, headers: {
    ...requestInit.headers,
    'Authorization': `Bearer ${token}`,
  }}
}

export const getResponseBody = async (res: Response): Promise<string | unknown> => {
  const contentType = res.headers.get('Content-Type');
  if (!contentType) return '';
  const isJson = contentType?.includes('application/json');
  return isJson ? res.json() : res.text();
}

export const processRequest = async <T>(url: string, requestInit: RequestInit = {}): Promise<T> => {
  const res = await fetch(url, requestInit);
  if (!res.ok) {
    const error = await getResponseBody(res);
    throw new HttpError(res, error);
  }
  return await getResponseBody(res) as T;
}

const getAuthorizedRequestUrl = () => {
  const { userId } = authorizedUserData;
  return `${usersUrl}/${userId}`;
}

export const processTokensUpdate = async (): Promise<boolean> => {
  try {
    const { userId, refreshToken } = authorizedUserData;
    const newTokens = await getUserTokens(userId, refreshToken);
    store.dispatch(updateTokens(newTokens));
    return true;
  } catch (error) {
    store.dispatch(deauthorize());
    throw error;
  }
}

export const processAuthorizedRequest = async <T>(requestInit: RequestInit = {}, urlPath?: string): Promise<T> => {
  try {
    const { token } = authorizedUserData;
    const url = `${getAuthorizedRequestUrl()}${urlPath || ''}`;
    return await processRequest<T>(url, withToken(token, requestInit));
    
  } catch (error) {
    if (error instanceof HttpError
        && authorizationErrors.includes(error.status)
        && await processTokensUpdate()) {
      return await processAuthorizedRequest<T>(requestInit, urlPath);
    }
    throw error;
  }
}