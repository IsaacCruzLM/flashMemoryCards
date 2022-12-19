import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import themes from '../../styles/themes';

import styles from './styles';
import {FloatingAddButtonProps} from './types';

const FloatingAddButton = ({routeName}: FloatingAddButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon color={themes.colors.background} size={50} name="plus" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingAddButton;
