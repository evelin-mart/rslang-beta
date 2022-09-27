import { Word } from "entities/word";
import { baseUrl } from "shared/constants";
import { processRequest, queryOptionsToString } from "../lib";
import { WordsQueryOptions } from "./interface";

export const wordsUrl = `${baseUrl}/words`;

export const getWords = async (queryOptions: WordsQueryOptions = { page: 0, group: 0 }) => {
  const url = `${wordsUrl}?${queryOptionsToString(queryOptions)}`;
  return await processRequest<Word[]>(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
}

export const getWordById = async (wordId: string) => {
  const url = `${wordsUrl}/${wordId}`;
  return await processRequest<Word>(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
}