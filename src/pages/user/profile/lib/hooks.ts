import React from 'react';
import * as usersApi from 'shared/api/users';

export const useUserData = (setData: (data: usersApi.UsetGetResult) => void) => {
  const [ loading, setLoading ] = React.useState<boolean | Error>(false);

  React.useEffect(() => {
    setLoading(true);
    usersApi.getUser()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => setLoading(err))
  }, [setData]);

  return [loading];
}