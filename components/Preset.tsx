import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {IPreset} from '../utils/settings';

interface Props {
  preset: IPreset;
  navigation: any;
  onDelete: (id: string) => void;
}

export const Preset = ({preset, navigation, onDelete}: Props) => {
  const onStart = () => {
    console.log('Start');
    console.log('Interval seconds', preset.intervalSeconds);
    navigation.replace('Countdown', {
      intervalLength:
        parseInt(preset.intervalMinutes, 10) * 60 +
        parseInt(preset.intervalSeconds, 10),
      intervalSets: preset.intervalSets,
      intervalRestLength: preset.intervalRestLength,
    });
  };

  return (
    <View>
      <Text>{preset.id}</Text>
      <Text>{preset.presetName}</Text>
      <Text>{preset.intervalMinutes.toString()}</Text>
      <Text>{preset.intervalSeconds.toString()}</Text>
      <Text>{preset.intervalSets.toString()}</Text>
      <Text>{preset.intervalRestLength.toString()}</Text>
      <Button onPress={onStart}>Start</Button>
      <Button onPress={() => onDelete(preset.id)}>Delete</Button>
    </View>
  );
};
