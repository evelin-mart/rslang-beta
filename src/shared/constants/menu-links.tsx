import { GAME } from ".";
import { games } from "./games";

export type MenuLink = {
  title: string,
  href: string,
  submenu?: MenuLink[],
  icon?: () => JSX.Element,
};

export const links: MenuLink[] = [
  {
    title: 'О проекте',
    href: '/',
  },
  {
    title: 'Учебник',
    href: '/textbook',
  },
  {
    title: 'Мини-игры',
    href: '/game',
    submenu: Object.keys(games).map((key) => {
      const { title, href, icon } = games[key as GAME];
      return {
        title, href, icon
      }
    })
  },
]