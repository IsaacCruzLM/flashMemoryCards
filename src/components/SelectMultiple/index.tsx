import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';

import TextInput from '../TextInput';
import IconButton from '../IconButton';

import {SelectMultipleProps, optionType} from './types';
import Theme from '../../styles/themes';
import styles from './styles';

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

  // render
  const renderItem = useCallback(
    ({item}) => {
      const {label, value, iconColor} = item;
      return (
        <TouchableOpacity
          onPress={() => {
            setStateValue(value);
            onChange(value);
          }}>
          <View style={styles.itemView}>
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
    [onChange, stateValue],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePresentModalPress}>
        <View pointerEvents="none">
          <TextInput
            label="Selecionar Assuntos"
            setText={() => {}}
            placeholder="Selecione pelo menos um assunto"
            value={''}
          />
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
