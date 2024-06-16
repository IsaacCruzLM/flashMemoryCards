import * as React from 'react';
import {View} from 'react-native';
import {Paragraph} from 'react-native-paper';

import styles from './styles';
import {ErrorWarningProps} from './types';

const ErrorWarning = ({show = false, label = ''}: ErrorWarningProps) =>
  show ? (
    <View style={styles.container}>
      <Paragraph style={styles.error}>{label}</Paragraph>
    </View>
  ) : null;

export default ErrorWarning;
