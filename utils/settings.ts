import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IPreset {
  id: string;
  presetName: string;
  intervalMinutes: number;
  intervalSeconds: number;
  intervalSets: number;
  intervalRestLength: number;
}

export const settings = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});
