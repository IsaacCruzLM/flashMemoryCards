import * as React from 'react';
import {View} from 'react-native';
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
import Category from '../screens/Category';
import Note from '../screens/Note';

import themes from '../styles/themes';
import sharedStyles from '../styles/sharedStyles';

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
      <Stack.Navigator initialRouteName="Notes">
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
          component={Category.list}
          options={{
            title: 'Anotações para revisar',
            ...headerStyled,
            headerRight: () => (
              <Icon
                color={themes.colors.background}
                size={themes.spacing.unit * 3.5}
                name="magnify"
                onPress={() => {}}
              />
            ),
          }}
        />
        <Stack.Screen
          name="NewCategory"
          component={Category.create}
          options={{
            title: 'Nova Categoria',
            ...headerStyled,
          }}
        />
        <Stack.Screen
          name="Notes"
          component={Note.list}
          options={{
            title: 'Categoria X',
            ...headerStyled,
            headerRight: () => (
              <View style={sharedStyles.headerRightIconView}>
                <Icon
                  color={themes.colors.background}
                  size={themes.spacing.unit * 3.5}
                  name="filter-variant"
                  onPress={() => {}}
                  style={sharedStyles.headerIconWithMargin}
                />
                <Icon
                  color={themes.colors.background}
                  size={themes.spacing.unit * 3.5}
                  name="magnify"
                  onPress={() => {}}
                  style={sharedStyles.headerIconWithMargin}
                />
              </View>
            ),
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
