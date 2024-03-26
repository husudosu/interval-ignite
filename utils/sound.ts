import Sound from 'react-native-sound';

export enum SoundFile {
  WHISTLE = 'coach_whistle.wav',
}

export const playSound = (soundFile: SoundFile) => {
  Sound.setCategory('Playback');
  const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, error => {
    console.log('Sound playing error:', error);
    sound.play(success => {
      console.log('Sound playing success:', success);
    });
  });
};
