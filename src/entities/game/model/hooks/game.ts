import { useAppSelector } from 'app/store';

export const useGame = () => {
  return useAppSelector((state) => state.game);
}

export const useGameResults = () => {
  const { results, words } = useAppSelector((state) => state.game);

  const correctWordIds = Object.keys(results).filter((id) => results[id]);
  const failedWordIds = Object.keys(results).filter((id) => !results[id]);

  const correctWords = words.filter(({ id }) => correctWordIds.includes(id));
  const failedWords = words.filter(({ id }) => failedWordIds.includes(id));
  
  return {
    correctWords,
    failedWords,
  }
}
