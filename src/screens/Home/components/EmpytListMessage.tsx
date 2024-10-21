import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import themes from '../../../styles/themes';

import styles from './styles';

const EmpytListMessage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          color={themes.colors.primary}
          size={themes.spacing.unit * 10}
          name={'file-document-edit-outline'}
        />
      </View>
      <Text style={styles.title}>Nenhuma anotação a ser revisada</Text>
      <Text style={styles.subtitle}>
        Insira novas anotações ou revise as anotações acessando-as pela seção de
        categorias
      </Text>
    </View>
  );
};

export default EmpytListMessage;
