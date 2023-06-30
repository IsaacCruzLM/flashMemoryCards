import React, {useState} from 'react';
import {View} from 'react-native';

import DataInput from '../DataInput';

import styles from './styles';
import {DataRangeInputProps} from './types';

const DataRangeInput = ({
  label,
  onChangeRange,
  defaultValue = {
    init: null,
    end: null,
  },
}: DataRangeInputProps) => {
  const [rangeData, setRangeData] = useState(defaultValue);

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
        defaultValue={rangeData.init}
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
        defaultValue={rangeData.end}
      />
    </View>
  );
};

export default DataRangeInput;
