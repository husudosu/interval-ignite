import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {IntervalSelector} from '../components/IntervalSelector';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

export const HomeView = () => {
  const [intervalMinutes, setIntervalMinutes] = useState('0');
  const [intervalSeconds, setIntervalSeconds] = useState('10');
  const [timerStarted, setTimerStarted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [key, setKey] = useState(0);

  const onStartPress = () => {
    if (!timerStarted) {
      setTimerStarted(true);
      const intervalMinutesInt = parseInt(intervalMinutes, 10);
      const intervalSecondsInt = parseInt(intervalSeconds, 10);
      if (!isNaN(intervalMinutesInt) && !isNaN(intervalSecondsInt)) {
        setDuration(intervalMinutesInt * 60 + intervalSecondsInt);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const onCountdownComplete = () => {
    setIsPlaying(false);
    setTimerStarted(false);
    setDuration(0);
    setKey(key + 1);
  };

  return (
    <View>
      <IntervalSelector
        intervalMinutes={intervalMinutes}
        intervalSeconds={intervalSeconds}
        setIntervalMinutes={setIntervalMinutes}
        setIntervalSeconds={setIntervalSeconds}
      />

      <Button onPress={onStartPress}>{!isPlaying ? 'Start' : 'Pause'}</Button>
      <CountdownCircleTimer
        key={key}
        onComplete={onCountdownComplete}
        isPlaying={isPlaying}
        duration={duration}
        initialRemainingTime={0}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}>
        {({remainingTime}) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
    </View>
  );
};
