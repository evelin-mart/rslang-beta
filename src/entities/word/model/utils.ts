import { addUserWord, updateUserWord, UserWord } from 'shared/api/users-words';
import { Word } from './interface';

export const getWordProgress = ({ optional }: UserWord) => {
  if (optional.totalUsed === 0) {
    return null;
  } else if (optional.guessed === 0) {
    return 0;
  }
  return (optional.guessed * 100) / optional.totalUsed;
};

export const getProgressbarColor = (progress: number | null) => {
  if (progress === null) return 'inherit';
  if (progress <= 25) return 'error';
  if (progress <= 75) return 'primary';
  return 'success';
};

export const toggleWordState = (prop: 'isHard' | 'isLearned', userWord: UserWord, word: Word) => {
  let { isHard, isLearned } = userWord.optional;
  if (prop === 'isHard') {
    isHard = !isHard;
    isLearned = isHard ? false : isLearned;
  }
  if (prop === 'isLearned') {
    isLearned = !isLearned;
    isHard = isLearned ? false : isHard;
  }
  const newUserWord = {
    ...userWord,
    optional: {
      ...userWord.optional,
      isLearned,
      isHard,
    },
  };
  if (word.userWord) {
    return updateUserWord(word.id, newUserWord);
  } else {
    return addUserWord(word.id, newUserWord);
  }
};
