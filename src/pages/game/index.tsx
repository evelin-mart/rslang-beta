import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from 'pages/page';
import { GAME, PAGES } from 'shared/constants';
import { games } from 'shared/constants/games';
import {
  GAME_PHASE,
  resetGame,
  setGameId,
  useGame,
  GameStartScreen,
  GameResults,
  GameInterface,
  GameCountdown,
} from 'entities/game';
import { AppDispatch } from 'app/store';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

export const GamePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { gamePhase } = useGame();
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: GAME }>();
  
  useEffect(() => {
    if (gameId !== undefined) {
      if (!games[gameId]) {
        navigate('/*', { replace: true });
      } else {
        dispatch(setGameId(gameId));
        dispatch(resetGame());
      }
    }
  }, [gameId, navigate, dispatch]);

  return (
    <Page pageName={PAGES.GAME} pt={0}>
      <GameInterface>
        {/* В зависимости от фазы игры, рэндерится тот или иной компонент
            фазу игры меняем с помощью dispatch(setGamePhase(GAME_PHASE))
        */}
        {gamePhase === GAME_PHASE.START && <GameStartScreen />}
        {gamePhase === GAME_PHASE.COUNTDOWN && <GameCountdown />}
        {(gamePhase === GAME_PHASE.PLAYING && gameId) && games[gameId].game()}
        {gamePhase === GAME_PHASE.RESULTS && <GameResults />}
        {gamePhase === GAME_PHASE.LOADING &&
          <Box sx={{ height: "calc(100% - var(--header-height))", display: "flex", alignItems: "center"}}>
            <CircularProgress color="secondary" size={100} thickness={2}/>
          </Box>}
      </GameInterface>
    </Page>
  )
}
