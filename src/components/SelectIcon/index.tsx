import * as React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../styles/themes';

import MaterialCommunityIconList from '../../assets/materialCommunityIconList';

const SelectIcon = () => {
  const MaterialCommunityIconListNames = Object.keys(MaterialCommunityIconList);
  return (
    <View>
      <View>
        <Text>Selecione um icone</Text>
        <View>
          <Icon
            color={Theme.colors.primary}
            size={Theme.spacing.unit * 5}
            name={'chevron-left'}
          />
          {[0, 1, 2, 3].map((item, index) => (
            <Icon
              color={Theme.colors.primary}
              size={Theme.spacing.unit * 5}
              name={MaterialCommunityIconListNames[index]}
            />
          ))}
          <Icon
            color={Theme.colors.primary}
            size={Theme.spacing.unit * 5}
            name={'chevron-right'}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectIcon;
