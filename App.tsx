/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {Provider as PaperProvider, useTheme} from 'react-native-paper';

import {database} from './src/databases';
import theme from './src/styles/themes';

function HomeScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}

function AboutScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>About Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <DatabaseProvider database={database}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DatabaseProvider>
    </PaperProvider>
  );
};

export default App;
