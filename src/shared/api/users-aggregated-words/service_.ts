import { processAuthorizedRequest } from "../lib";
import { TOTAL_WORDS, WORDS_PER_PAGE } from 'shared/constants';
import {
  AggregatedWordsQueryOptions,
  AggregatedWordsResult,
  AggregatedWord, 
  AggregatedWordInResponse} from "./interface";

interface AggregatedWordsQueryOptionsWithFilter extends AggregatedWordsQueryOptions {
  filter?: string;
}

const defaultQueryOptions: AggregatedWordsQueryOptionsWithFilter = {
  page: 0,
  group: 0,
  wordsPerPage: WORDS_PER_PAGE,
}

const queryOptionsToString = ({ wordsPerPage, group, page, filter }: AggregatedWordsQueryOptions) => {
  const resultFilter = filter !== undefined
    ? filter
    : JSON.stringify({ $and: [ { page }, { group } ] });
  
  const params = [`filter=${resultFilter}`];
  if (wordsPerPage) params.push(`wordsPerPage=${wordsPerPage}`);

  return params.join('&');
}

const transformId = (word: AggregatedWordInResponse): AggregatedWord => {
  const id = word._id || '';
  delete word._id;
  return { ...word, id };
}

const urlPath = `/aggregatedWords`;

export const _getAggregatedWords = async (queryOptions: AggregatedWordsQueryOptions) => {
  const url = `${urlPath}?${queryOptionsToString({...defaultQueryOptions, ...queryOptions})}`;
  const [{ paginatedResults }] = await processAuthorizedRequest<AggregatedWordsResult>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, url);
  return paginatedResults.map(transformId);
}

export const _getAggregatedWordById = async (wordId: string) => {
  const url = `${urlPath}/${wordId}`;
  const [word] = await processAuthorizedRequest<[AggregatedWordInResponse]>({
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  }, url);
  return transformId(word);
}

export const _getHardAggregatedWords = async () => {
  const filter = { "userWord.optional.isHard": true };
  return _getAggregatedWords({ filter: JSON.stringify(filter), wordsPerPage: TOTAL_WORDS });
}