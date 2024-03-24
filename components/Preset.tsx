import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {IPreset} from '../utils/settings';

interface Props {
  preset: IPreset;
}

export const Preset = ({preset}: Props) => {
  return (
    <View>
      <Text>{preset.presetName}</Text>
      <Text>{preset.intervalMinutes}</Text>
      <Text>{preset.intervalSeconds}</Text>
      <Text>{preset.intervalSets}</Text>
      <Text>{preset.intervalRestLength}</Text>
    </View>
  );
};
