import * as React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {InlineFieldProps} from './types';

const InlineField = ({label, content}: InlineFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${label}: `}</Text>
      <Text numberOfLines={1} style={styles.content}>
        {content}
      </Text>
    </View>
  );
};

export default InlineField;
