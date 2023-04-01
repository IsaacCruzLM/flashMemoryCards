import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../styles/themes';

import MaterialCommunityIconList from '../../assets/materialCommunityIconList';

import styles from './styles';
import {SelectIconProps} from './types';

const MaterialCommunityIconListNames = Object.keys(MaterialCommunityIconList);
const getInitialIndex = (value: string) => {
  let initialIndex = 0;
  const iconIndex = MaterialCommunityIconListNames.indexOf(value);
  for (let index = initialIndex; index < iconIndex; index += 4) {
    initialIndex = index;
  }

  return initialIndex;
};

const SelectIcon = ({value = '', onPress}: SelectIconProps) => {
  const [initalIconIndex, setInitalIconIndex] = useState(
    getInitialIndex(value),
  );
  const [selectedIcon, setSelectedIcon] = useState(value);

  const renderIconList = () => {
    const elementList = [];
    for (let index = initalIconIndex; index < initalIconIndex + 4; index++) {
      elementList.push(
        <TouchableOpacity
          style={
            selectedIcon === MaterialCommunityIconListNames[index]
              ? styles.selectedIconContainer
              : styles.defaultIconContainer
          }
          onPress={() => {
            onPress && onPress(MaterialCommunityIconListNames[index]);
            setSelectedIcon(MaterialCommunityIconListNames[index]);
          }}
          key={MaterialCommunityIconListNames[index]}>
          <Icon
            color={Theme.colors.primary}
            size={Theme.spacing.unit * 4}
            name={MaterialCommunityIconListNames[index]}
          />
        </TouchableOpacity>,
      );
    }
    return elementList;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>Selecione um icone</Text>
      <View style={styles.iconListContainer}>
        <TouchableOpacity
          onPress={() => setInitalIconIndex(initalIconIndex - 4)}
          disabled={initalIconIndex - 4 < 0}>
          <Icon
            color={Theme.colors.primary}
            size={Theme.spacing.unit * 8}
            name={'chevron-left'}
          />
        </TouchableOpacity>
        {renderIconList()}
        <TouchableOpacity
          onPress={() => setInitalIconIndex(initalIconIndex + 4)}
          disabled={
            initalIconIndex + 7 > MaterialCommunityIconListNames.length - 1
          }>
          <Icon
            color={Theme.colors.primary}
            size={Theme.spacing.unit * 8}
            name={'chevron-right'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectIcon;
