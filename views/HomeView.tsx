import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

interface Props {
  navigation: any;
}

export const HomeView = ({navigation}: Props) => {
  const [intervalMinutes, setIntervalMinutes] = useState('0');
  const [intervalSeconds, setIntervalSeconds] = useState('2');
  const [intervalSets, setIntervalSets] = useState('3');
  const [intervalRestLength, setIntervalRestLength] = useState('5');

  const [timerStarted, setTimerStarted] = useState(false);

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

  return (
    <View>
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
    </View>
  );
};
