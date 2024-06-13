import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import themes from '../../styles/themes';

import styles from './styles';
import {EmpytListMessageProps} from './types';

const EmpytListMessage = ({customStyle, itemName}: EmpytListMessageProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.icon}>
        <Icon
          color={themes.colors.primary}
          size={themes.spacing.unit * 10}
          name={'alert-circle-outline'}
        />
      </View>
      <Text
        style={
          styles.title
        }>{`Nenhum(a) ${itemName} foi encontrado(a) em sua busca`}</Text>
    </View>
  );
};

export default EmpytListMessage;
