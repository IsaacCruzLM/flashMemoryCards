import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';

import NavigationService from '../../navigation/NavigationService';

import styles from './styles';

const SideMenu = (props: DrawerContentComponentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label={'Anotações para revisar'}
            onPress={() => NavigationService.navigate('Home')}
            icon={({color, size}) => (
              <Icon color={color} size={size} name={'notebook-edit'} />
            )}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label={'Categorias'}
            onPress={() => NavigationService.navigate('Categories')}
            icon={({color, size}) => (
              <Icon color={color} size={size} name={'folder-eye'} />
            )}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label={'Assuntos'}
            onPress={() => NavigationService.navigate('Subjects')}
            icon={({color, size}) => (
              <Icon color={color} size={size} name={'book-education'} />
            )}
            labelStyle={styles.labelStyle}
          />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

export default SideMenu;
