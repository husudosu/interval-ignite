import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {AddNewPreset} from '../components/AddNewPreset';
import {SafeAreaView} from 'react-native';
import {IPreset, settings} from '../utils/settings';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Preset} from '../components/Preset';
interface Props {
  navigation: any;
}

export const HomeView = ({navigation}: Props) => {
  const [showDeletionDialog, setShowDeletionDialog] = useState(false);
  const [presetIdToDelete, setPresetIdToDelete] = useState('');

  const [intervalMinutes, setIntervalMinutes] = useState('0');
  const [intervalSeconds, setIntervalSeconds] = useState('2');
  const [intervalSets, setIntervalSets] = useState('3');
  const [intervalRestLength, setIntervalRestLength] = useState('5');

  const [presets, setPresets] = useState<IPreset[]>([]);
  const isLoading = useRef(true);
  const [timerStarted, setTimerStarted] = useState(false);

  const loadSettings = async () => {
    const ids = await settings.getIdsForKey('presets');
    const res = await settings.getBatchDataWithIds({key: 'presets', ids: ids});
    const newPresets = res.map((preset: any, index: number) => ({
      id: ids[index],
      ...preset,
    }));
    setPresets(newPresets);
  };

  useEffect(() => {
    if (isLoading.current) {
      isLoading.current = false;
      loadSettings();
    }
    return () => {};
  }, [isLoading]);

  const onStartPress = () => {
    if (!timerStarted) {
      setTimerStarted(true);
      const intervalMinutesInt = parseInt(intervalMinutes, 10);
      const intervalSecondsInt = parseInt(intervalSeconds, 10);
      if (!isNaN(intervalMinutesInt) && !isNaN(intervalSecondsInt)) {
        navigation.replace('Countdown', {
          intervalLength: intervalMinutesInt * 60 + intervalSecondsInt,
          intervalSets,
          intervalRestLength,
        });
      }
    }
  };

  const onAddNewPreset = (preset: IPreset) => {
    settings
      .save({
        key: 'presets',
        id: uuidv4(),
        data: preset,
        expires: null,
      })
      .then(() => {
        console.log('Preset saved');
        loadSettings();
      });
  };

  const onDeletePreset = (id: string) => {
    setPresetIdToDelete(id);
    setShowDeletionDialog(true);
  };

  const deletePreset = () => {
    settings.remove({key: 'presets', id: presetIdToDelete}).then(() => {
      loadSettings();
      setPresetIdToDelete('');
      setShowDeletionDialog(false);
    });
  };

  // TODO: Add validation to fields only allow number input!
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Quick start</Text>
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
        <Button onPress={onStartPress}>Start</Button>

        <Text style={styles.title}>Presets</Text>

        {/* Deletion dialog for presets */}
        <Portal>
          <Dialog visible={showDeletionDialog}>
            <Dialog.Title>Preset</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Are you sure about deleting the preset?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowDeletionDialog(false)}>
                Cancel
              </Button>
              <Button onPress={deletePreset}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {presets.length === 0 && <Text>No presets saved.</Text>}
        {presets.map((preset, index) => (
          <Preset
            key={index}
            preset={preset}
            navigation={navigation}
            onDelete={onDeletePreset}
          />
        ))}

        <Text style={styles.title}>Add new preset</Text>
        <AddNewPreset onAddPreset={onAddNewPreset} />
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  fieldMargin: {
    marginBottom: 8,
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    marginTop: 12,
    marginBottom: 12,
  },
});
