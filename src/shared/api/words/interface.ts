import { QueryOptions } from "../lib";

export interface WordsQueryOptions extends QueryOptions {
  group?: number;
  page?: number;
}