import { GAME } from ".";
// import ParkIcon from '@mui/icons-material/Park';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { AudiocallGame, SprintGame } from 'entities/game/ui';

type GameInfo = {
  title: string,
  href: string,
  description: string,
  statsKey: string,
  maxWords: number,
  icon: () => JSX.Element,
  game: () => JSX.Element,
};

export const games: Record<GAME, GameInfo> = {
  [GAME.AUDIO]: {
    title: 'Аудиовызов',
    href: '/game/audio',
    description: `«Аудиовызов» - это тренировка, которая улучшает восприятие речи на слух. Выберите из предложенных вариантов ответа правильный перевод слова, который услышите.`,
    statsKey: 'a',
    maxWords: 10,
    icon: () => <HeadphonesIcon />,
    game: () => <AudiocallGame />,
  },
  [GAME.SPRINT]: {
    title: 'Спринт',
    href: '/game/sprint',
    description: `«Спринт» - это тренировка для повторения заученных слов из вашего словаря. Выберите соответсвует ли перевод предложенному слову.`,
    statsKey: 's',
    maxWords: 60,
    icon: () => <DirectionsRunIcon />,
    game: () => <SprintGame />,
  },
  // [GAME.SAVANNAH]: {
  //   title: 'Саванна',
  //   href: '/game/savannah',
  //   description: `«Саванна» - это тренировка для развития словарного запаса. Выберите правильный перевод слова из предложенных за отведенное время.`,
  //   statsKey: 'sa',
  //   maxWords: 10,
  //   icon: () => <ParkIcon />,
  //   game: () => <SavannahGame />,
  // },
}