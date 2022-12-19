import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SideMenu from '../components/SideMenu';
import NavigationService from './NavigationService';

import InitialPage from '../screens/InitialPage';
import TutorialPage from '../screens/TutorialPage';
import HomeScreen from '../screens/Home';
import Categories from '../screens/Categories';
import NewCategory from '../screens/NewCategory';

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
      <Stack.Navigator initialRouteName="Home">
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
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            title: 'Anotações para revisar',
            ...headerStyled,
            headerRight: () => (
              <Icon
                color={themes.colors.background}
                size={themes.spacing.unit * 3}
                name="magnify"
                onPress={() => {}}
              />
            ),
          }}
        />
        <Stack.Screen
          name="NewCategory"
          component={NewCategory}
          options={{
            title: 'Nova Categoria',
            ...headerStyled,
          }}
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
} as NativeStackNavigationOptions;

export default Routes;
