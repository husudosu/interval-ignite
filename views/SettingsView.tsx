import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {Switch} from 'react-native-paper';
import {settings} from '../utils/settings';

export const SettingsView = () => {
  const isLoading = useRef(true);
  const [soundOn, setSoundOn] = useState(false);

  const loadSettings = () => {
    settings
      .load({key: 'soundOn'})
      .then(res => setSoundOn(res))
      .catch(err => {
        if (err.name === 'NotFoundError') {
          console.log('Setting not found soundOn, setting default');
          settings.save({key: 'soundOn', data: true});
          setSoundOn(true);
        }
      });
  };

  useEffect(() => {
    if (isLoading.current) {
      isLoading.current = false;
      loadSettings();
    }
    return () => {};
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Switch
          value={soundOn}
          onValueChange={value => {
            settings.save({key: 'soundOn', data: value});
            setSoundOn(value);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  fieldMargin: {
    marginBottom: 8,
  },
  title: {
    textAlign: 'left',
    fontSize: 22,
    marginTop: 12,
    marginBottom: 12,
  },
});
