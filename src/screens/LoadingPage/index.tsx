import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import Theme from '../../styles/themes';
import styles from './styles';

const LoadingPage = () => (
  <View testID="loading-container" style={styles.container}>
    <ActivityIndicator
      testID="loading-indicator"
      size="large"
      color={Theme.colors.primary}
    />
  </View>
);

export default LoadingPage;
