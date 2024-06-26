import React, {useEffect, useContext} from 'react';
import {TouchableOpacity, View, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import get from 'lodash/get';

import NavigationService from './NavigationService';
import AppContext from '../context/appContext';

import InitialPage from '../screens/InitialPage';
import TutorialPage from '../screens/TutorialPage';
import HomeScreen from '../screens/Home';
import Category from '../screens/Category';
import Note from '../screens/Note';
import Subject from '../screens/Subject';

import SideMenu from '../components/SideMenu';

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
  const {
    globalState,
    setKeyboardIsVisible,
    setShowDialogEditNote,
    setSearchParamsFunction,
    setIsOpenSearchBar,
    setFilterDialogOpenFunction,
  } = useContext(AppContext);

  const headerSearchBar = (pageName: string) => {
    return {
      onChangeText: (event: any) =>
        setSearchParamsFunction({[pageName]: event.nativeEvent.text}),
      onCancelButtonPress: () => setSearchParamsFunction({[pageName]: ''}),
      headerIconColor: themes.colors.background,
      tintColor: themes.colors.background,
      textColor: themes.colors.background,
      barTintColor: themes.colors.disabled,
      shouldShowHintSearchIcon: false,
      onFocus: () => setIsOpenSearchBar(true),
      onBlur: () => setIsOpenSearchBar(false),
    };
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [setKeyboardIsVisible]);

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
          component={Category.list}
          options={{
            title: 'Categorias',
            ...headerStyled,
            headerSearchBarOptions: headerSearchBar('Categories'),
          }}
        />
        <Stack.Screen
          name={'NewCategory'}
          component={Category.create}
          options={props => {
            const isEdit = get(props, 'route.params.isEdit', false);

            return {
              title: isEdit ? 'Editar Categoria' : 'Nova Categoria',
              ...headerStyled,
            };
          }}
        />
        <Stack.Screen
          name="Notes"
          component={Note.list}
          options={props => {
            const categoryName = get(props, 'route.params.categoryName', '');
            const categoryId = get(props, 'route.params.categoryId', '');

            return {
              title: categoryName,
              ...headerStyled,
              headerSearchBarOptions: headerSearchBar('Notes'),
              headerRight: () =>
                globalState.isOpenSearchBar ? null : (
                  <View style={sharedStyles.headerRightIconView}>
                    <TouchableOpacity
                      onPress={() =>
                        NavigationService.navigate('NewCategory', {
                          categoryId: categoryId,
                          isEdit: true,
                        })
                      }>
                      <Icon
                        color={themes.colors.background}
                        size={themes.spacing.unit * 3}
                        name="square-edit-outline"
                        style={sharedStyles.headerIconWithMargin}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        setFilterDialogOpenFunction({Notes: true})
                      }>
                      <Icon
                        color={themes.colors.background}
                        size={themes.spacing.unit * 3}
                        name="filter-variant"
                        style={sharedStyles.headerIconWithMargin}
                      />
                    </TouchableOpacity>
                  </View>
                ),
            };
          }}
        />
        <Stack.Screen
          name="Subjects"
          component={Subject.list}
          options={{
            title: 'Assuntos',
            ...headerStyled,
            headerSearchBarOptions: headerSearchBar('Subjects'),
          }}
        />
        <Stack.Screen
          name={'NewSubject'}
          component={Subject.create}
          options={props => {
            const isEdit = get(props, 'route.params.isEdit', false);

            return {
              title: isEdit ? 'Editar Assunto' : 'Novo Assunto',
              ...headerStyled,
            };
          }}
        />
        <Stack.Screen
          name={'NewNote'}
          component={Note.create}
          options={props => {
            const isEdit = get(props, 'route.params.isEdit', false);

            return {
              title: isEdit ? 'Editar Anotação' : 'Nova Anotação',
              ...headerStyled,
            };
          }}
        />
        <Stack.Screen
          name={'ShowNote'}
          component={Note.show}
          options={props => {
            const noteName = get(props, 'route.params.noteName', '');

            return {
              title: noteName,
              ...headerStyled,
              headerRight: () => (
                <Icon
                  color={themes.colors.background}
                  size={themes.spacing.unit * 3.5}
                  name="square-edit-outline"
                  onPress={() => setShowDialogEditNote(true)}
                />
              ),
            };
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
