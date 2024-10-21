import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';

import NavigationService from '../../navigation/NavigationService';

import styles from './styles';
import {track} from '@formbricks/react-native';

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
          <DrawerItem
            label={'Criar Resumo PDF'}
            onPress={() => NavigationService.navigate('PDFResume')}
            icon={({color, size}) => (
              <Icon color={color} size={size} name={'file-pdf-box'} />
            )}
            labelStyle={styles.labelStyle}
          />
        </DrawerContentScrollView>
        <View>
          <DrawerItem
            label={'Ajuda'}
            onPress={() => NavigationService.navigate('Help')}
            icon={({color, size}) => (
              <Icon color={color} size={size} name={'help-circle-outline'} />
            )}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label={'Reportar Melhorias'}
            onPress={() => {
              track('answer_feedback_survey');
            }}
            icon={({color, size}) => (
              <Icon color={color} size={size} name={'comment-edit-outline'} />
            )}
            labelStyle={styles.labelStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default SideMenu;
