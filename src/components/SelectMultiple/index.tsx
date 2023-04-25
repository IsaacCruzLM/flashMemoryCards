import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import CheckBox from '@react-native-community/checkbox';
import cloneDeep from 'lodash/cloneDeep';

import IconButton from '../IconButton';

import {SelectMultipleProps} from './types';
import styles from './styles';

const ChipComponent = ({text}) => {
  return (
    <View style={styles.chipContainer}>
      <Text numberOfLines={1} style={styles.chipText}>
        {text}
      </Text>
    </View>
  );
};

const SelectMultiple = ({
  options,
  onChange,
  defaultValue = [],
  modalTitle,
}: SelectMultipleProps) => {
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
  const handleSelect = useCallback(
    (value: string) => {
      let selectedValues = cloneDeep(stateValue);
      if (selectedValues.includes(value)) {
        selectedValues = selectedValues.filter(
          selectedValue => value !== selectedValue,
        );
      } else {
        selectedValues.push(value);
      }
      setStateValue(selectedValues);
      onChange(selectedValues);
    },
    [onChange, stateValue],
  );

  // render
  const renderItem = useCallback(
    ({item}) => {
      const {label, value, iconColor} = item;
      return (
        <TouchableOpacity onPress={() => handleSelect(value)}>
          <View style={styles.itemView}>
            <CheckBox
              disabled={false}
              value={stateValue.includes(value as string)}
              onValueChange={() => handleSelect(value)}
            />
            {iconColor && (
              <View
                style={[styles.iconColorView, {backgroundColor: iconColor}]}
              />
            )}
            <Text
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
    [handleSelect, stateValue],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePresentModalPress}>
        <View pointerEvents="none">
          <View style={styles.fakeInputStyle}>
            {false ? (
              <Text style={styles.placeHolderStyle}>Selecionar Asuntos</Text>
            ) : (
              [
                'Alice Alice Alice Alice Alice Alice Alice Alice Alice Alice Alice Alice',
                'Bruno',
                'Carla',
                'David',
                'Elisa',
                'Fernando',
                'Gabriel',
              ].map(name => <ChipComponent text={name} />)
            )}
          </View>
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}>
        <View style={styles.contentContainer}>
          <View style={styles.actionsContainer}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <IconButton
              modeParam="contained"
              iconName="close"
              onPress={handleDismissModalPress}
              iconSize={20}
            />
          </View>
          <BottomSheetFlatList
            data={options}
            keyExtractor={({value}: any) => value}
            renderItem={renderItem}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default SelectMultiple;
