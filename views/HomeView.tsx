import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
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
  const [intervalMinutes, setIntervalMinutes] = useState('0');
  const [intervalSeconds, setIntervalSeconds] = useState('2');
  const [intervalSets, setIntervalSets] = useState('3');
  const [intervalRestLength, setIntervalRestLength] = useState('5');

  const [presets, setPresets] = useState<IPreset[]>([]);
  const isLoading = useRef(true);
  const [timerStarted, setTimerStarted] = useState(false);

  const loadSettings = () => {
    console.log('Loading settings');
    settings.getAllDataForKey('presets').then((data: IPreset[]) => {
      setPresets(data);
      console.log(data);
    });
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
  // TODO: Add validation to fields only allow number input!
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Quick start</Text>
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
        <Button onPress={onStartPress}>Start</Button>

        <Text>Add new preset</Text>
        <AddNewPreset onAddPreset={onAddNewPreset} />

        <Text>Presets</Text>
        {presets.map((preset, index) => (
          <Preset key={index} preset={preset} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
