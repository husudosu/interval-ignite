import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

interface Props {
  onAddPreset: (preset: any) => void;
}

export const AddNewPreset = ({onAddPreset}: Props) => {
  const [presetName, setPresetName] = useState('');
  const [intervalMinutes, setIntervalMinutes] = useState('0');
  const [intervalSeconds, setIntervalSeconds] = useState('0');
  const [intervalSets, setIntervalSets] = useState('3');
  const [intervalRestLength, setIntervalRestLength] = useState('5');

  return (
    <View>
      <TextInput
        label="Preset name"
        value={presetName}
        onChangeText={text => setPresetName(text)}
      />
      <TextInput
        label="Minutes"
        keyboardType="number-pad"
        value={intervalMinutes}
        onChangeText={text => setIntervalMinutes(text)}
      />
      <TextInput
        label="Seconds"
        keyboardType="number-pad"
        value={intervalSeconds}
        onChangeText={text => setIntervalSeconds(text)}
      />
      <TextInput
        label="Sets"
        keyboardType="number-pad"
        value={intervalSets}
        onChangeText={text => setIntervalSets(text)}
      />
      <TextInput
        label="Rest length"
        keyboardType="number-pad"
        value={intervalRestLength}
        onChangeText={text => setIntervalRestLength(text)}
      />
      <Button
        onPress={() =>
          onAddPreset({
            presetName,
            intervalMinutes,
            intervalSeconds,
            intervalSets,
            intervalRestLength,
          })
        }>
        Add preset
      </Button>
    </View>
  );
};
