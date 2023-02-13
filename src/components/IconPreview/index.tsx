import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../styles/themes';

import styles from './styles';
// import {SelectIconProps} from './types';

const IconPreview = ({}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Cor do icone</Text>
        <View />
      </View>
      <View>
        <Text>Preview</Text>
        <View />
      </View>
    </View>
  );
};

export default IconPreview;
