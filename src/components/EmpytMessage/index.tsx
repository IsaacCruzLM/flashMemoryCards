import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import themes from '../../styles/themes';

import styles from './styles';
import {EmpytMessageProps} from './types';
import Button from '../Button';

const EmpytMessage = ({
  customStyle,
  message,
  actionLabel,
  onPressAction,
}: EmpytMessageProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Icon
        color={themes.colors.primary}
        size={themes.spacing.unit * 12}
        name={'sleep'}
        style={styles.icon}
      />
      <Text style={styles.title}>Opsss!</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onPressAction && (
        <Button label={actionLabel} onPress={onPressAction} />
      )}
    </View>
  );
};

export default EmpytMessage;
