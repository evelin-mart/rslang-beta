import { Word } from 'entities/word';
import { STATUS } from 'shared/constants';
import { LoadingState } from 'shared/lib';

export interface TextbookState extends LoadingState {
  page: number;
  group: number;
  totalPages: number;
  words: Word[];
}

// https://materialui.co/colors/ - 600
export const rainbow = [
  '#757575',
  '#43A047',
  '#1E88E5',
  '#FFEB3B',
  '#FB8C00',
  '#EC407A',
  '#E53935',
];

export const getLastSeenPage = (group?: number) => {
  const pages = localStorage.getItem('pages');
  if (!pages) {
    const pages = Array(7).fill(0);
    localStorage.setItem('pages', JSON.stringify(pages));
    localStorage.setItem('group', String(0));
    return [0, 0];
  }
  if (!group) group = Number(localStorage.getItem('group') || 0);
  const page: number = JSON.parse(pages)[group];
  return [group, page];
};

export const setLastSeenPage = (group: number, n: number) => {
  const pages = JSON.parse(localStorage.getItem('pages') || '');
  pages[group] = n;
  localStorage.setItem('group', group.toString());
  localStorage.setItem('pages', JSON.stringify(pages));
};

const [group, page] = getLastSeenPage();

export const initialState: TextbookState = {
  page,
  group,
  totalPages: 30,
  words: [],
  status: STATUS.IDLE,
  error: null,
};
