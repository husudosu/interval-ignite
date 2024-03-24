import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IPreset {
  presetName: string;
  intervalMinutes: string;
  intervalSeconds: string;
  intervalSets: string;
  intervalRestLength: string;
}

export const settings = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});
