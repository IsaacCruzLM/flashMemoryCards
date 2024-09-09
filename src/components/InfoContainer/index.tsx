import * as React from 'react';
import {View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import themes from '../../styles/themes';

import styles from './styles';
import {InfoContainerProps} from './types';

const ICON_TRANSLATION = {
  info: 'information',
} as any;

const InfoContainer = ({
  show = true,
  message = '',
  level = 'info',
}: InfoContainerProps) =>
  show ? (
    <View style={styles.container}>
      <Icon
        color={themes.colors.primary}
        size={themes.spacing.unit * 5}
        name={ICON_TRANSLATION[level]}
      />
      <Paragraph style={styles.message}>{message}</Paragraph>
    </View>
  ) : null;

export default InfoContainer;
