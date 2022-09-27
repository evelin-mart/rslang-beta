import { WordsQueryOptions } from "../words";
import { Word } from 'entities/word';
import { UserWord } from 'shared/api/users-words';

export interface AggregatedWordsQueryOptions extends WordsQueryOptions {
  wordsPerPage?: number;
}

export const hardWordsFilter = JSON.stringify({ 'userWord.optional.isHard': true });

export interface AggregatedWordInResponse extends Omit<Word, 'id'> {
  _id?: string;
  userWord?: UserWord;
}

export interface AggregatedWord extends Word {
  userWord?: UserWord;
}

export type AggregatedWordsResult = [{
  paginatedResults: AggregatedWordInResponse[];
  totalCount: [{
    count: number;
  }];
}]