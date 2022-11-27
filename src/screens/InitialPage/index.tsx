import * as React from 'react';
import {View} from 'react-native';

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
          <Button label="Teste" />
        </View>
      </View>
    </LinearGradientView>
  );
};

export default InitialPage;
