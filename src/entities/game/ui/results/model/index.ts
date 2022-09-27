
export enum TAB {
  GRAPH, WORDS
}

export const getResultTitle = (correctWordsPercent: number) => {
  return correctWordsPercent >= 80
    ? 'Отличный результат!'
    : correctWordsPercent >= 60
      ? 'Хороший результат!'
      : 'Могло быть и хуже'
}
