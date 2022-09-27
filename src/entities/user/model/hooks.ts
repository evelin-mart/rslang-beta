import { useAppSelector } from 'app/store';

export const useUser = () => {
  return useAppSelector((state) => state.user);
}
