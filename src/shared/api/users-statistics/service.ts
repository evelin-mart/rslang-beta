import { processAuthorizedRequest } from "../lib";
import { UserStatistics, UserStatisticsResponse } from './interface';

export const statisticsUrlPath = `/statistics`;

export const getUserStatistics = async () => {
  const result = await processAuthorizedRequest<UserStatisticsResponse>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, statisticsUrlPath);
  delete result.id;
  return result as UserStatistics;
}

export const updateUserStatistics = async (userStatistics: Partial<UserStatistics>) => {
  return await processAuthorizedRequest<UserStatisticsResponse>({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(userStatistics),
  }, statisticsUrlPath);
}