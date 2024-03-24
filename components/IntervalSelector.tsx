import React from 'react';

import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface Props {
  intervalMinutes: string;
  intervalSeconds: string;
  setIntervalMinutes: (minutes: string) => void;
  setIntervalSeconds: (seconds: string) => void;
}

export const IntervalSelector = ({
  intervalMinutes,
  intervalSeconds,
  setIntervalMinutes,
  setIntervalSeconds,
}: Props) => {
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
    </View>
  );
};
