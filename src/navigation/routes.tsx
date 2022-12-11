import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SideMenu from '../components/SideMenu';
import NavigationService from './NavigationService';

import InitialPage from '../screens/InitialPage';
import TutorialPage from '../screens/TutorialPage';
import HomeScreen from '../screens/Home';

import themes from '../styles/themes';

function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Anotações para revisar',
          ...headerStyled,
        }}
      />
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

const headerStyled = {
  headerStyle: {
    backgroundColor: themes.colors.primary,
  },
  headerTintColor: themes.colors.background,
  headerTitleStyle: {
    fontWeight: '700',
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle,
    color: themes.colors.background,
  },
} as React.CSSProperties;

export default Routes;
