import React from 'react';
import {View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';

import NavigationService from '../../navigation/NavigationService';

const SideMenu = (props: DrawerContentComponentProps) => {
  return (
    <View style={{flex: 1}}>
      <View style={{height: '90%'}}>
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
