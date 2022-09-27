import { processAuthorizedRequest } from "../lib";
import { UserSettings } from './interface';

export const settingsUrlPath = `/settings`;

export const getUserSettings = async () => {
  return await processAuthorizedRequest<UserSettings>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, settingsUrlPath);
}

export const updateUserSettings = async (userSettings: Partial<UserSettings>) => {
  return await processAuthorizedRequest<UserSettings>({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userSettings),
  }, settingsUrlPath);
}
