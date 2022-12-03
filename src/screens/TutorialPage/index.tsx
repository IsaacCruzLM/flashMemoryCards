import * as React from 'react';
import {View} from 'react-native';

import NavigationService from '../../navigation/NavigationService';

import LinearGradientView from '../../components/LinearGradientView';
import Button from '../../components/Button';

import InfoTip from './components/InfoTip';

import styles from './styles';

const TutorialPage = () => {
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
          />
          <InfoTip
            title={'Seja relembrado'}
            subTitle={
              'Receba uma recordação para relembrar suas anotações, após 1 dia, 7 dias, 1 mês e 3 meses.'
            }
            icon={'bell-ring'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => NavigationService.navigate('Home')}
            label="Começar"
          />
        </View>
      </View>
    </LinearGradientView>
  );
};

export default TutorialPage;
