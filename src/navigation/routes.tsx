import * as React from 'react';
import {View, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SideMenu from '../components/SideMenu';
import NavigationService from './NavigationService';

import InitialPage from '../screens/InitialPage';
import TutorialPage from '../screens/TutorialPage';

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

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name="InitialPage"
          component={InitialPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tutorial"
          component={TutorialPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
