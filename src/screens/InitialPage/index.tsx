import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

import NavigationService from '../../navigation/NavigationService';

import LogoSvg from '../../assets/logo.svg';

import LinearGradientView from '../../components/LinearGradientView';
import Button from '../../components/Button';

import styles from './styles';

const InitialPage = () => {
  const logoPosition = useSharedValue(0);
  const titlePosition = useSharedValue(30);
  const subTitlePosition = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    titlePosition.value = withTiming(0, {duration: 500}, () => {
      subTitlePosition.value = withTiming(0, {duration: 500}, () => {
        buttonOpacity.value = withTiming(1, {duration: 500});
      });
    });
  });

  useEffect(() => {
    logoPosition.value = withSequence(
      withTiming(10, {duration: 750}),
      withTiming(0, {duration: 750}),
    );
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

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const logoViewStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: logoPosition.value}],
    };
  });

  return (
    <LinearGradientView>
      <View style={styles.container}>
        <Animated.View style={logoViewStyle}>
          <LogoSvg height={78} width={93} fill="#ffffff" />
        </Animated.View>
        <View style={styles.buttonContainer}>
          <Animated.Text style={[styles.title, titleStyle]}>
            {`Bem vindo(a) ao${'\n'}Flash Memory${'\n'}Cards`}
          </Animated.Text>
          <Animated.Text style={[styles.subTitle, subTitleStyle]}>
            Seja relembrado de suas anotações, para que o conhecimento seja
            realmente fixado!
          </Animated.Text>
          <Animated.View style={buttonStyle}>
            <Button
              onPress={() => NavigationService.navigate('Tutorial')}
              label="Entrar"
            />
          </Animated.View>
        </View>
      </View>
    </LinearGradientView>
  );
};

export default InitialPage;
