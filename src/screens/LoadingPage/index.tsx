import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import Theme from '../../styles/themes';
import styles from './styles';

const LoadingPage = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Theme.colors.primary} />
  </View>
);

export default LoadingPage;
