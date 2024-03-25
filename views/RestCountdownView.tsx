import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
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

  const onSkipPress = () => {
    navigation.replace('Countdown', route.params);
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        key={key}
        onComplete={onCountdownComplete}
        isPlaying={isPlaying}
        duration={duration}
        initialRemainingTime={0}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}>
        {({remainingTime}) => <Text>Rest: {remainingTime}</Text>}
      </CountdownCircleTimer>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => setIsPlaying(!isPlaying)}
          icon={isPlaying ? 'pause' : 'play'}>
          {isPlaying ? 'Pause' : 'Continue'}
        </Button>
        <Button onPress={onSkipPress} icon="stop">
          Skip
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%',
    marginTop: 16,
    flexDirection: 'column',
    gap: 8,
  },
});
