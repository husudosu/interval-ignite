import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

interface Props {
  route: any;
  navigation: any;
}

export const CountdownView = ({route, navigation}: Props) => {
  const {intervalLength} = route.params;
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (intervalLength) {
      setDuration(parseInt(intervalLength, 10));
      setIsPlaying(true);
    }
    () => {
      setIsPlaying(false);
      setDuration(0);
    };
  }, [intervalLength]);
  const [key, setKey] = useState(0);

  const onCountdownComplete = () => {
    setIsPlaying(false);
    setDuration(0);
    setKey(key + 1);
    navigation.replace('Home');
  };

  return (
    <View>
      <CountdownCircleTimer
        key={key}
        onComplete={onCountdownComplete}
        isPlaying={isPlaying}
        duration={duration}
        initialRemainingTime={0}
        updateInterval={0.1}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}>
        {({remainingTime}) => <Text>{remainingTime}</Text>}
      </CountdownCircleTimer>
      <Button onPress={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Continue'}
      </Button>

      <Button onPress={() => navigation.replace('Home')}>Stop</Button>
    </View>
  );
};
