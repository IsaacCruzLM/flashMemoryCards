import * as React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import {FloatingAddButtonProps} from './types';

const FloatingAddButton = ({routeName}: FloatingAddButtonProps) => {
  return (
    <View style={styles.container}>
      <Icon name="plus" />
    </View>
  );
};

export default FloatingAddButton;
