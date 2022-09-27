import React from 'react';

type EndHandler = () => void;

export const useTimer = (
  seconds: number, 
  delta = 1
): [typeof startTimer, typeof stopTimer, number] => {
  const counterStart = React.useRef(delta === 1 ? 0 : seconds);
  const [counter, setCounter] = React.useState(counterStart.current);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();
  const endHandlerRef = React.useRef<EndHandler>();
  
  const stopTimer = React.useCallback(() => {
    clearInterval(timer.current);
    setCounter(counterStart.current);
  }, []);


  const startTimer = React.useCallback((endHandler: EndHandler) => {
    endHandlerRef.current = endHandler;
    timer.current = setInterval(() => {
      setCounter((prev) => prev + delta);
    }, 1000);
  }, [delta]);

  React.useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, []);

  React.useEffect(() => {
    const end = delta === 1 ? seconds : 0;
    if (counter === end && endHandlerRef.current) {
      endHandlerRef.current();
      stopTimer();
    }
  }, [counter, seconds, delta, stopTimer]);

  return [
    startTimer, stopTimer, counter
  ]
}