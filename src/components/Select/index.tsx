import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../styles/themes';

import {SelectProps, optionType} from './types';

import styles from './styles';
import TextInput from '../TextInput';
import get from 'lodash/get';

const Select = ({options, onChange, defaultValue = ''}: SelectProps) => {
  const [stateValue, setStateValue] = useState(defaultValue);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['40%', '60%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // render
  const renderItem = useCallback(
    ({item}) => {
      const {label, value, iconName, iconColor} = item;
      return (
        <TouchableOpacity>
          <View style={styles.itemView}>
            {iconName && (
              <Icon
                color={iconColor || Theme.colors.primary}
                size={Theme.spacing.unit * 4}
                name={iconName}
              />
            )}
            <Text
              onPress={() => {
                setStateValue(value);
                onChange(value);
                handleDismissModalPress();
              }}
              style={[
                styles.itemStyle,
                // eslint-disable-next-line react-native/no-inline-styles
                {fontWeight: value === stateValue ? '700' : '600'},
              ]}>
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [handleDismissModalPress, onChange, stateValue],
  );

  const getOptionLabel = () =>
    get(
      options.find(({value}: optionType) => value === stateValue),
      'label',
      '',
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePresentModalPress}>
        <View pointerEvents="none">
          <TextInput
            label="Selecione Uma Categoria"
            setText={() => {}}
            placeholder="Selecione Uma Categoria"
            value={getOptionLabel()}
          />
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <BottomSheetFlatList
            data={options}
            keyExtractor={({value}: any) => value}
            renderItem={renderItem}
          />
          <View>
            <Text style={{color: 'black'}}>Action Here</Text>
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default Select;
