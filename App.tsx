import React from 'react';
import {View, useColorScheme} from 'react-native';
import {Button, PaperProvider} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {HomeView} from './views/HomeView';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {CountdownView} from './views/CountdownView';
import {RestCountdownView} from './views/RestCountdownView';
import {SettingsView} from './views/SettingsView';

const Stack = createNativeStackNavigator();

const headerRight = (navigation: any) => {
  return (
    <View>
      <Button
        onPress={() => {
          console.log('Settings pressed');
          navigation.navigate('Settings');
        }}
        icon="cog">
        Settings
      </Button>
    </View>
  );
};

const mainHeaderSettings = ({
  navigation,
}: {
  navigation: any;
}): NativeStackNavigationOptions => {
  return {
    headerShown: true,
    headerTitle: 'Interval timer',
    headerRight: () => headerRight(navigation),
    headerShadowVisible: false,
  };
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={mainHeaderSettings}
          />
          <Stack.Screen name="Settings" component={SettingsView} />
          <Stack.Screen
            name="Countdown"
            component={CountdownView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RestCountdown"
            component={RestCountdownView}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
