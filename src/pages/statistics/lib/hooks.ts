import React from 'react';
import * as userStatsApi from 'shared/api/users-statistics';

export const useStatistics = (): [boolean, userStatsApi.UserStatistics | Error | null] => {
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState<userStatsApi.UserStatistics | Error | null>(null);

  React.useEffect(() => {
    setLoading(true);

    userStatsApi.getUserStatistics()
      .then((data) => setStats(data))
      .catch((error) => setStats(error))
      .finally(() => setLoading(false));
  }, []);

  return [ loading, stats ];
}