export const play = async (arr: HTMLAudioElement[]) => {
  for (let i = 0; i < arr.length; i++) {
    try {
      await playSong(arr[i]);
    } catch {
      console.log('unexpected error in play', arr[i]);
    }
  }
};

export const playSong = async (audio: HTMLAudioElement) => {
  audio.play();

  return new Promise<void>((resolve, reject) => {
    audio.addEventListener('ended', () => resolve());
    audio.addEventListener('error', () => reject());
  });
};

export const stop = (arr: HTMLAudioElement[]) => arr.map((audio) => audio.pause());
