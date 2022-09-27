import { Middleware } from "@reduxjs/toolkit";
import { isUserRegistrationResult } from "shared/api/users";

export const saveDataToStoreMiddleware: Middleware = () => (next) => (action) => {
  let newData = null;
  if (action.type === 'user/authorize') {
    localStorage.setItem('user', JSON.stringify(action.payload));
  } else if (action.type === 'user/deauthorize') {
    localStorage.removeItem('user');
  } else if (action.type === 'user/updateTokens') {
    newData = action.payload;
  } else if (
    action.type === 'user/submitForm/fulfilled'
    && isUserRegistrationResult(action.payload)
  ) {
    newData = action.payload;
  }
  
  if (newData !== null) {
    const rawData = localStorage.getItem('user');
    if (rawData) {
      const data = JSON.parse(rawData);
      localStorage.setItem('user', JSON.stringify({ ...data, ...action.payload }));
    }
  }
  return next(action);
}
