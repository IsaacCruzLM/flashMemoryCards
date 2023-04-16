import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
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
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

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
          {options.map(({label, value, iconName, iconColor}: optionType) => (
            <TouchableOpacity>
              <View>
                {iconName && (
                  <Icon
                    color={iconColor || Theme.colors.primary}
                    size={Theme.spacing.unit * 5}
                    name={iconName}
                  />
                )}
                <Text
                  onPress={() => {
                    setStateValue(value);
                    onChange(value);
                    handleDismissModalPress();
                  }}
                  style={styles.itemStyle}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default Select;
