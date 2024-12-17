import * as React from 'react';
import {View, Text} from 'react-native';

import getContrastColor from '../../utils/getContrastColor';

import styles from './styles';
import {InlineFieldChipsProps} from './types';

const InlineFieldChips = ({label, arrayOfContents}: InlineFieldChipsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${label}: `}</Text>
      {arrayOfContents.map(({content, color}) => {
        const textColor = getContrastColor(color);

        return (
          <View key={content} style={[styles.chip, {backgroundColor: color}]}>
            <Text
              numberOfLines={1}
              style={[styles.content, {color: textColor}]}>
              {content}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default InlineFieldChips;
