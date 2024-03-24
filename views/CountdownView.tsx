import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

interface Props {
  route: any;
  navigation: any;
}

export const CountdownView = ({route, navigation}: Props) => {
  const {intervalLength, intervalSets} = route.params;
  const [duration, setDuration] = useState(0);
  const [sets, setSets] = useState(0);
  const viewLoaded = useRef(false);
  const [key, setKey] = useState(0);
  console.log(route.params);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!viewLoaded.current) {
      viewLoaded.current = true;
      setDuration(parseInt(intervalLength, 10));
      if (intervalSets) {
        console.log('Interval sets', intervalSets);
        setSets(intervalSets);
        setIsPlaying(true);
      } else {
        throw new Error('Interval sets not defined');
      }
    }
    return () => {};
  }, [viewLoaded, intervalLength, intervalSets]);

  const onCountdownComplete = () => {
    if (sets > 1) {
      console.log('Set done');
      // Go to rest
      navigation.replace('RestCountdown', {
        ...route.params,
        intervalSets: sets - 1,
      });
    } else {
      console.log('Navigate to Home');
      navigation.replace('Home');
    }
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
