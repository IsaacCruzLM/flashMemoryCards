import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';

import NavigationService from '../../navigation/NavigationService';

import LinearGradientView from '../../components/LinearGradientView';
import Button from '../../components/Button';

import InfoTip from './components/InfoTip';

import styles from './styles';

const TutorialPage = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => setIsDisabled(false), 6500);
    buttonOpacity.value = withDelay(6000, withTiming(1, {duration: 500}));
  });

  const buttonContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  return (
    <LinearGradientView>
      <View style={styles.container}>
        <View style={styles.infosContainer}>
          <InfoTip
            title={'Crie suas anotações'}
            subTitle={'Crie suas anotações dos mais diversos assuntos'}
            icon={'pen-plus'}
          />
          <InfoTip
            title={'Separe-as por assunto'}
            subTitle={'Melhore sua organização, separando suas anotações'}
            icon={'folder-plus'}
            animationDelay={2000}
          />
          <InfoTip
            title={'Seja relembrado'}
            subTitle={
              'Receba uma recordação para relembrar suas anotações, após 1 dia, 7 dias, 1 mês e 3 meses.'
            }
            icon={'bell-ring'}
            animationDelay={4000}
          />
        </View>
        <Animated.View style={[styles.buttonContainer, buttonContainerStyle]}>
          <Button
            disabled={isDisabled}
            onPress={() => NavigationService.navigate('Home')}
            label="Começar"
          />
        </Animated.View>
      </View>
    </LinearGradientView>
  );
};

export default TutorialPage;
