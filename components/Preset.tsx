import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Card} from 'react-native-paper';
import {IPreset} from '../utils/settings';

interface Props {
  preset: IPreset;
  navigation: any;
  onDelete: (id: string) => void;
}

export const Preset = ({preset, navigation, onDelete}: Props) => {
  const onStart = () => {
    navigation.replace('Countdown', {
      intervalLength:
        parseInt(preset.intervalMinutes, 10) * 60 +
        parseInt(preset.intervalSeconds, 10),
      intervalSets: preset.intervalSets,
      intervalRestLength: preset.intervalRestLength,
    });
  };

  return (
    <View>
      <Card>
        <Card.Content style={style.cardContent}>
          <View style={style.titleContainer}>
            <Text variant="titleLarge">{preset.presetName}</Text>
            <Button onPress={() => onDelete(preset.id)}>Delete</Button>
          </View>
          <Text variant="bodyMedium">
            <Text style={{fontWeight: 'bold'}} variant="bodyMedium">
              Interval:
            </Text>
            {preset.intervalMinutes}:{preset.intervalSeconds}
          </Text>
          <Text variant="bodyMedium">
            <Text style={{fontWeight: 'bold'}} variant="bodyMedium">
              Sets:
            </Text>
            {preset.intervalSets}
          </Text>
          <Text variant="bodyMedium">
            <Text style={{fontWeight: 'bold'}} variant="bodyMedium">
              Rest:
            </Text>
            {preset.intervalRestLength} seconds
          </Text>
        </Card.Content>
        <Card.Actions style={style.cardActions}>
          <Button onPress={onStart} style={style.buttonStart}>
            Start
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export const style = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'column',
    gap: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    marginBottom: 8,
  },
  buttonStart: {
    width: '100%',
  },
});
