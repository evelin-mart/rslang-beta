import React from 'react';
import { makeAbsUrl } from 'shared/constants';
import { Sound } from 'shared/constants';

export const useSound = (): [
  typeof playSound,
  {
    stopSound: typeof stopSound,
    isPlaying: boolean,
    canPlay: boolean,
  }
 ] => {
  const [sound, setSound] = React.useState<Sound>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [canPlay, setCanPlay] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if (sound !== null) {
      sound.play()
        .then(() => setIsPlaying(true))
        .catch(() => setSound(null));
    }
    return () => {
      if (sound) {
        sound.pause();
        setIsPlaying(false);
      }
    }
  }, [sound, setIsPlaying]);

  const playSound = React.useCallback((url: string) => {
    const newSound = new Audio(makeAbsUrl(url));
    newSound.addEventListener('ended', () => setIsPlaying(false));
    newSound.addEventListener('canplaythrough', () => {
      setSound(newSound);
      setCanPlay(true);
    });
  }, [])

  const stopSound = React.useCallback(() => {
    setSound(null);
  }, [setSound]);

  return [
    playSound,
    {
      stopSound,
      isPlaying,
      canPlay,
    }
  ]
}
