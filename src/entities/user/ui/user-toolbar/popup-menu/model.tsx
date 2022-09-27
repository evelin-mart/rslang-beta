import {
  ManageAccounts as ManageAccountsIcon,
  BarChart as BarChartIcon } from '@mui/icons-material';

export const userMenuOptions: Record<string, {
  title: string,
  href: string,
  icon: JSX.Element,
}> = {
  profile: {
    title: 'Профайл',
    href: '/profile',
    icon: <ManageAccountsIcon/>,
  },
  statistics: {
    title: 'Статистика',
    href: '/statistics',
    icon: <BarChartIcon/>,
  },
};