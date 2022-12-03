import * as React from 'react';
import {View, Text} from 'react-native';

import NavigationService from '../../navigation/NavigationService';

import LogoSvg from '../../assets/logo.svg';

import LinearGradientView from '../../components/LinearGradientView';
import Button from '../../components/Button';

import styles from './styles';

const InitialPage = () => {
  return (
    <LinearGradientView>
      <View style={styles.container}>
        <View>
          <LogoSvg height={78} width={93} fill="#ffffff" />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.title}>
            {`Bem vindo(a) ao${'\n'}Flash Memory${'\n'}Cards`}
          </Text>
          <Text style={styles.subTitle}>
            Seja relembrado de suas anotações, para que o conhecimento seja
            realmente fixado!
          </Text>
          <Button
            onPress={() => NavigationService.navigate('Tutorial')}
            label="Entrar"
          />
        </View>
      </View>
    </LinearGradientView>
  );
};

export default InitialPage;
