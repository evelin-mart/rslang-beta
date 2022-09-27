import { AppDispatch } from 'app/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLongestChain } from '../store';
import { useGame } from './game';

export const useLongestChain = (): [typeof setChainCounter, number] => {
  const dispatch: AppDispatch = useDispatch();
  const [ chainCounter, setChainCounter ] = React.useState(0);
  const { longestChain } = useGame();

  React.useEffect(() => {
    if (longestChain < chainCounter) dispatch(setLongestChain(chainCounter));
  }, [chainCounter, dispatch, longestChain]);

  return [
    setChainCounter,
    chainCounter,
  ];
}
