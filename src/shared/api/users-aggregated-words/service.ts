import { WORDS_PER_PAGE } from 'shared/constants';
import { processAuthorizedRequest } from '../lib';

import {
  AggregatedWordsQueryOptions,
  AggregatedWordsResult,
  AggregatedWord,
  AggregatedWordInResponse,
  hardWordsFilter,
} from './interface';

const transformId = (word: AggregatedWordInResponse): AggregatedWord => {
  const id = word._id || '';
  delete word._id;
  return { ...word, id };
};

export const urlPath = `/aggregatedWords`;

const getAggregatedWords = async (queryOptions: string): Promise<[AggregatedWord[], number]> => {
  const url = `${urlPath}?${queryOptions}`;
  const [{ paginatedResults, totalCount }] = await processAuthorizedRequest<AggregatedWordsResult>(
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    url,
  );
  return [paginatedResults.map(transformId), totalCount.length ? totalCount[0]['count'] : 1];
};

export const getAggregatedWordsOnPage = async ({
  page,
  group,
}: Pick<AggregatedWordsQueryOptions, 'page' | 'group'>) => {
  const filter = JSON.stringify({ $and: [{ page }, { group }] });
  const queryOptions = `wordsPerPage=${WORDS_PER_PAGE}&filter=${filter}`;
  const res = await getAggregatedWords(queryOptions);
  return res[0];
};

export const getHardAggregatedWords = async (page: number): Promise<[AggregatedWord[], number]> => {
  const queryOptions = [
    `page=${page}`,
    `wordsPerPage=${WORDS_PER_PAGE}`,
    `filter=${hardWordsFilter}`,
  ].join('&');

  const [words, totalCount] = await getAggregatedWords(queryOptions);
  const totalPages = Math.ceil(totalCount / WORDS_PER_PAGE);

  return [words, totalPages];
};

export const getAggregatedWordById = async (wordId: string) => {
  const url = `${urlPath}/${wordId}`;
  const [word] = await processAuthorizedRequest<[AggregatedWordInResponse]>(
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    url,
  );
  return transformId(word);
};
