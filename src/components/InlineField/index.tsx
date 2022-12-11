import * as React from 'react';
import {View, Text} from 'react-native';
import {Paragraph} from 'react-native-paper';

import styles from './styles';
import {InlineFieldProps} from './types';

const InlineField = ({label, content}: InlineFieldProps) => {
  return (
    <Paragraph style={styles.paragraphContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>{`${label}: `}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </Paragraph>
  );
};

export default InlineField;
