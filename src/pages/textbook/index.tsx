import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Page } from 'pages/page';
import { AppDispatch, useAppSelector } from 'app/store';
import { WordCard } from 'entities/word';
import {
  List,
  ListItem,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import styles from './styles.module.scss';
import { STATUS, PAGES } from '../../shared/constants';
import { play, stop } from './utils';
import { getHardWords, getWords, rainbow, setGroup, setLastSeenPage, setPage } from './model';
import { useUser } from 'entities/user/model/hooks';
import classNames from 'classnames';
import { setGameSource } from 'entities/game';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Ribbon } from '../../shared/images/ribbon.svg';
import { useUi } from 'shared/lib/store/ui';
import { useScrollbarWidth } from 'shared/lib';

export const TextbookPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { words, status, error, page, group, totalPages } = useAppSelector(
    (state) => state.textbook,
  );
  const { isAuthorized } = useUser();
  const [sounds, setSounds] = useState<HTMLAudioElement[]>([]);
  const navigate = useNavigate();
  const { scrollbarWidth } = useScrollbarWidth();
  const { isBodyOverflow } = useUi();

  let isLearned = false;

  useEffect(() => {
    sounds.length && play(sounds);
    return () => {
      sounds.length && stop(sounds);
    };
  }, [sounds]);

  useEffect(() => {
    if (group === 6) {
      dispatch(getHardWords());
    } else {
      dispatch(getWords(isAuthorized));
    }
    setLastSeenPage(group, page);
  }, [page, group, dispatch, isAuthorized]);

  const handleGroupChange = (event: SelectChangeEvent) => {
    const groupId = +event.target.value;
    dispatch(setGroup(groupId));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, pageId: number) => {
    dispatch(setPage(pageId - 1));
  };

  const handleGameClick = (path: string) => {
    dispatch(setGameSource('textbook'));
    navigate(path, { replace: true });
  };

  let content: JSX.Element | undefined;

  if (status === STATUS.LOADING) {
    content = (
      <Box
        sx={{
          height: 'calc(100% - var(--header-height))',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <CircularProgress sx={{ color: rainbow[group] }} size={60} thickness={2} />
      </Box>
    );
  }

  if (status === STATUS.SUCCESS) {
    if (group === 6 && !words.length) {
      if (page === 0) {
        content = <Typography variant='h4'>В данном разделе нет слов</Typography>;
      } else {
        dispatch(setPage(page - 1));
      }
    } else {
      isLearned = words.every((word) => word.userWord && word.userWord.optional.isLearned);
      const renderedItem = words.map((word) => (
        <ListItem key={word.id} sx={{ p: 0, alignItems: 'stretch' }} className={styles.listItem}>
          <WordCard word={word} play={setSounds} />
        </ListItem>
      ));
      content = (
        <>
          <List sx={{ pt: 3 }} className={styles.list}>
            {renderedItem}
          </List>
          <Pagination
            className={styles.pagination}
            color='primary'
            count={group === 6 ? totalPages : 30}
            page={page + 1}
            onChange={handlePageChange}
          />
        </>
      );
    }
  }

  if (status === STATUS.FAIL) {
    content = (
      <div>
        <p>Error! {error}</p>
      </div>
    );
  }

  return (
    <Page pageName={PAGES.TEXTBOOK}>
      <Grid>
        <Select
          value={String(group)}
          sx={{
            width: 250,
            m: 1,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: rainbow[group] },
          }}
          onChange={handleGroupChange}>
          <MenuItem value={0}>Раздел 1</MenuItem>
          <MenuItem value={1}>Раздел 2</MenuItem>
          <MenuItem value={2}>Раздел 3</MenuItem>
          <MenuItem value={3}>Раздел 4</MenuItem>
          <MenuItem value={4}>Раздел 5</MenuItem>
          <MenuItem value={5}>Раздел 6</MenuItem>
          {isAuthorized && <MenuItem value={6}>Сложные слова</MenuItem>}
        </Select>
        <Box sx={{ display: 'inline-block', ml: 1, fontWeight: 'bold' }}>Страница {page + 1}</Box>
      </Grid>
      {isLearned && (
        <Box className={styles.wrapper}>
          <Box className={styles.shimmer}>Все слова на этой странице изучены!</Box>
        </Box>
      )}
      {content}
      {!isLearned && (
        <>
          <Box
            className={classNames(styles.game, styles.audio)}
            onClick={() => handleGameClick('/game/audio')}
            title='Аудиовызов'></Box>
          <Box
            className={classNames(styles.game, styles.sprint)}
            onClick={() => handleGameClick('/game/sprint')}
            title='Спринт'></Box>
        </>
      )}

      <Box
        sx={{
          position: isBodyOverflow ? 'fixed' : 'absolute',
          top: 'calc(var(--header-height) - 2px)',
          right: isBodyOverflow ? `calc(2% + ${scrollbarWidth}px)` : '2%',
          zIndex: -1,
        }}>
        <Ribbon fill={rainbow[group]} className={styles.ribbon} />
      </Box>
    </Page>
  );
};
