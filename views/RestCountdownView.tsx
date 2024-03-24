import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

interface Props {
  route: any;
  navigation: any;
}

export const RestCountdownView = ({route, navigation}: Props) => {
  const {intervalRestLength} = route.params;
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const viewLoaded = useRef(false);
  useEffect(() => {
    if (!viewLoaded.current) {
      viewLoaded.current = true;
      setDuration(parseInt(intervalRestLength, 10));
      setIsPlaying(true);
    }
    return () => {};
  }, [intervalRestLength]);

  const onCountdownComplete = () => {
    navigation.replace('Countdown', route.params);
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
        {({remainingTime}) => <Text>Rest: {remainingTime}</Text>}
      </CountdownCircleTimer>
    </View>
  );
};
