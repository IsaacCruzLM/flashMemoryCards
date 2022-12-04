import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import themes from '../../../../styles/themes';

import styles from './styles';
import {InfoTipProps} from './types';

const InfoTip = ({title, subTitle, icon, animationDelay = 0}: InfoTipProps) => {
  const iconOpacity = useSharedValue(0);
  const titlePosition = useSharedValue(30);
  const subTitlePosition = useSharedValue(30);

  useEffect(() => {
    iconOpacity.value = withDelay(
      animationDelay,
      withTiming(1, {duration: 1000}, () => {
        titlePosition.value = withTiming(0, {duration: 500}, () => {
          subTitlePosition.value = withTiming(0, {duration: 500});
        });
      }),
    );
  });

  const iconContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: titlePosition.value}],
      opacity: interpolate(
        titlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  const subTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: subTitlePosition.value}],
      opacity: interpolate(
        subTitlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={iconContainerStyle}>
        <Icon name={icon} size={70} color={themes.colors.background} />
      </Animated.View>
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, titleStyle]}>
          {title}
        </Animated.Text>
        <Animated.Text style={[styles.subTitle, subTitleStyle]}>
          {subTitle}
        </Animated.Text>
      </View>
    </View>
  );
};

export default InfoTip;
