import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
        style={styles.fieldMargin}
        label="Preset name"
        value={presetName}
        onChangeText={text => setPresetName(text)}
      />
      <TextInput
        style={styles.fieldMargin}
        label="Minutes"
        keyboardType="number-pad"
        value={intervalMinutes}
        onChangeText={text => setIntervalMinutes(text)}
      />
      <TextInput
        style={styles.fieldMargin}
        label="Seconds"
        keyboardType="number-pad"
        value={intervalSeconds}
        onChangeText={text => setIntervalSeconds(text)}
      />
      <TextInput
        style={styles.fieldMargin}
        label="Sets"
        keyboardType="number-pad"
        value={intervalSets}
        onChangeText={text => setIntervalSets(text)}
      />
      <TextInput
        style={styles.fieldMargin}
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

export const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  fieldMargin: {
    marginBottom: 8,
  },
});
