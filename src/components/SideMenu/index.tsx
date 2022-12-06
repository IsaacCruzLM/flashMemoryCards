import React from 'react';
import {View} from 'react-native';
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
            label={'Home'}
            onPress={() => NavigationService.navigate('Home')}
          />
          <DrawerItem
            label={'About'}
            onPress={() => NavigationService.navigate('About')}
          />
        </DrawerContentScrollView>
      </View>
    </View>
  );
};

export default SideMenu;
