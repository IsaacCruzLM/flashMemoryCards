import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
} from 'react-native-reanimated';

import LogoSvg from '../../assets/logo.svg';

import styles from './styles';
import {EmpytMessageProps} from './types';
import Button from '../Button';

const EmpytMessage = ({
  customStyle,
  message,
  actionLabel,
  onPressAction,
}: EmpytMessageProps) => {
  const logoPosition = useSharedValue(0);

  useEffect(() => {
    logoPosition.value = withRepeat(withTiming(10, {duration: 2000}), -1, true);
  });

  const logoViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: logoPosition.value}],
    };
  });

  return (
    <View style={[styles.container, customStyle]}>
      <Animated.View style={[styles.icon, logoViewStyle]}>
        <LogoSvg height={93} width={108} />
      </Animated.View>
      <Text style={styles.title}>Opsss!</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onPressAction && (
        <Button label={actionLabel} onPress={onPressAction} />
      )}
    </View>
  );
};

export default EmpytMessage;
