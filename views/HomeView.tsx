import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {IntervalSelector} from '../components/IntervalSelector';

interface Props {
  navigation: any;
}

export const HomeView = ({navigation}: Props) => {
  const [intervalMinutes, setIntervalMinutes] = useState('0');
  const [intervalSeconds, setIntervalSeconds] = useState('2');
  const [timerStarted, setTimerStarted] = useState(false);

  const onStartPress = () => {
    if (!timerStarted) {
      setTimerStarted(true);
      const intervalMinutesInt = parseInt(intervalMinutes, 10);
      const intervalSecondsInt = parseInt(intervalSeconds, 10);
      if (!isNaN(intervalMinutesInt) && !isNaN(intervalSecondsInt)) {
        navigation.replace('Countdown', {
          intervalLength: intervalMinutesInt * 60 + intervalSecondsInt,
          intervalSets: 3,
          intervalRestLength: 5,
        });
      }
    }
  };

  return (
    <View>
      <IntervalSelector
        intervalMinutes={intervalMinutes}
        intervalSeconds={intervalSeconds}
        setIntervalMinutes={setIntervalMinutes}
        setIntervalSeconds={setIntervalSeconds}
      />

      <Button onPress={onStartPress}>Start</Button>
    </View>
  );
};
