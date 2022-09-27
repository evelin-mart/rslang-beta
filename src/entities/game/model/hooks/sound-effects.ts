import React from 'react';
import { Sound } from 'shared/constants';
import { useGame } from './game';
import rightSound from 'shared/sounds/right.mp3';
import wrongSound from 'shared/sounds/wrong.mp3';

export enum SOUND_EFFECT {
  RIGHT, WRONG,
}

const isPlaying = (sound: HTMLMediaElement) => {
  return sound.currentTime > 0 && !sound.paused && !sound.ended && sound.readyState > 2;
}

export const useSoundEffect = () => {
  const { isSound } = useGame();
  const isSoundRef = React.useRef(isSound);
  
  React.useEffect(() => {
    isSoundRef.current = isSound;
  }, [isSound]);

  const sounds = React.useRef<Record<SOUND_EFFECT, Sound> | null>(null);

  const playSoundEffect = React.useCallback((soundEffect: SOUND_EFFECT) => {
    const sound = sounds.current?.[soundEffect] || null;
    if (sound !== null && isSoundRef.current) {
      if (isPlaying(sound)) {
        sound.pause();
        sound.currentTime = 0;
      }
      sound.play();
    }
  }, []);

  React.useEffect(() => {
    sounds.current = {
      [SOUND_EFFECT.RIGHT]: new Audio(rightSound),
      [SOUND_EFFECT.WRONG]: new Audio(wrongSound),
    }
  }, []);
  
  return [
    playSoundEffect
  ]
}