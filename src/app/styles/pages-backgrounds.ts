import { Theme } from '@mui/material';
import { PAGES } from 'shared/constants';
import mainPageBgImg from 'shared/images/main-background-image.jpg';

const backgrounds: Partial<Record<PAGES, { bg?: string | ((theme: Theme) => string), filter?: string}>> = {
  [PAGES.MAIN]: {
    bg: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${mainPageBgImg}) no-repeat 50% top fixed`,
  },
  [PAGES.GAME]: {
    bg: ({ palette }: Theme) => `${palette.grey[50]}`
  },
  [PAGES.STATISTICS]: {
    bg: ({ palette }: Theme) => `${palette.grey[50]}`
  },
  [PAGES.PROFILE]: {
    bg: ({ palette }: Theme) => `${palette.grey[50]}`
  }
}

export default backgrounds;