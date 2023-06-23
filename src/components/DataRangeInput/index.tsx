import React, {useState} from 'react';
import {View} from 'react-native';

import DataInput from '../DataInput';

import styles from './styles';
import {DataRangeInputProps, rangeDataType} from './types';

const DataRangeInput = ({label, onChangeRange}: DataRangeInputProps) => {
  const [rangeData, setRangeData] = useState({
    init: null,
    end: null,
  } as rangeDataType);

  return (
    <View style={styles.container}>
      <DataInput
        label={`De (${label})`}
        placeHolder={'Insira a data de início'}
        onConfirmData={async data => {
          const newRangeData = {...rangeData, init: data};
          setRangeData(newRangeData);
          onChangeRange(newRangeData);
        }}
        textInputStyle={styles.textInputStyle}
        containerStyle={styles.containerStyle}
      />
      <DataInput
        label={`A (${label})`}
        placeHolder={'Insira a data de fim'}
        onConfirmData={async data => {
          const newRangeData = {...rangeData, end: data};
          setRangeData(newRangeData);
          onChangeRange(newRangeData);
        }}
        textInputStyle={styles.textInputStyle}
        containerStyle={styles.containerStyle}
      />
    </View>
  );
};

export default DataRangeInput;
