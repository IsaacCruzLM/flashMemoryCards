import * as React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import themes from '../../../../styles/themes';

import styles from './styles';
import {InfoTipProps} from './types';

const InfoTip = ({title, subTitle, icon}: InfoTipProps) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={70} color={themes.colors.background} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default InfoTip;
