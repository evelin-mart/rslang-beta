
export type  QueryOptions = Record<string, string | number | undefined>

export function queryOptionsToString(queryOptions: QueryOptions): string {
  return Object.entries(queryOptions)
    .map((opt) => opt.join('='))
    .join('&');
}