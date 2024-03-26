import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';

interface Props {
  onAddPreset: (preset: any) => void;
}

export const AddNewPreset = ({onAddPreset}: Props) => {
  const [presetNameError, setPresetNameError] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [intervalMinutes, setIntervalMinutes] = useState('0');
  const [intervalSeconds, setIntervalSeconds] = useState('10');
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
      {presetNameError && (
        <HelperText type="error" visible={presetNameError}>
          Preset name required{' '}
        </HelperText>
      )}

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
        onPress={() => {
          if (presetName.length === 0) {
            setPresetNameError(true);
            return;
          }
          onAddPreset({
            presetName,
            intervalMinutes,
            intervalSeconds,
            intervalSets,
            intervalRestLength,
          });
        }}>
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
