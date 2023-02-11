import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../styles/themes';

import MaterialCommunityIconList from '../../assets/materialCommunityIconList';

const SelectIcon = () => {
  const [initalIconIndex, setInitalIconIndex] = useState(0);
  const MaterialCommunityIconListNames = Object.keys(MaterialCommunityIconList);

  const renderIconList = () => {
    const elementList = [];
    for (let index = initalIconIndex; index < initalIconIndex + 4; index++) {
      console.log(index);
      elementList.push(
        <Icon
          color={Theme.colors.primary}
          size={Theme.spacing.unit * 5}
          name={MaterialCommunityIconListNames[index]}
          onPress={() => {}}
        />,
      );
    }
    return elementList;
  };

  console.log(initalIconIndex);

  return (
    <View>
      <View>
        <Text>Selecione um icone</Text>
        <View>
          <Icon
            color={Theme.colors.primary}
            size={Theme.spacing.unit * 5}
            name={'chevron-left'}
            onPress={() => setInitalIconIndex(initalIconIndex - 4)}
            disabled={initalIconIndex - 4 < 0}
          />
          {renderIconList()}
          <Icon
            color={Theme.colors.primary}
            size={Theme.spacing.unit * 5}
            name={'chevron-right'}
            onPress={() => setInitalIconIndex(initalIconIndex + 4)}
            disabled={
              initalIconIndex + 7 > MaterialCommunityIconListNames.length - 1
            }
          />
        </View>
      </View>
    </View>
  );
};

export default SelectIcon;
