import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetFlatList} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import get from 'lodash/get';

import TextInput from '../TextInput';
import IconButton from '../IconButton';

import {SelectProps, optionType} from './types';
import Theme from '../../styles/themes';
import styles from './styles';

const Select = ({
  options,
  onChange,
  defaultValue = '',
  modalTitle,
  inputLabel = '',
  inputPlaceHolder = '',
  error = false,
  errorLabel = '',
}: SelectProps) => {
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
    ({item}: any) => {
      const {label, value, iconName, iconColor} = item;
      return (
        <TouchableOpacity
          onPress={() => {
            setStateValue(value);
            onChange(value);
            handleDismissModalPress();
          }}>
          <View style={styles.itemView}>
            {iconName && (
              <Icon
                color={iconColor || Theme.colors.primary}
                size={Theme.spacing.unit * 4}
                name={iconName}
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
        <View style={{}} pointerEvents="none">
          <TextInput
            label={inputLabel}
            setText={() => {}}
            placeholder={inputPlaceHolder}
            value={getOptionLabel()}
            error={error}
            errorLabel={errorLabel}
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
            testID={modalTitle}
            data={options}
            keyExtractor={({value}: any) => value}
            renderItem={renderItem}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default Select;
