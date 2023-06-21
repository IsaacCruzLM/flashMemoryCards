import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {DataInputProps} from './types';
import TextInput from '../TextInput';

const DataInput = ({label, placeHolder, onConfirmData}: DataInputProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            setText={() => {}}
            placeholder={placeHolder}
            value={date.toLocaleDateString('pt-BR')}
          />
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={dateReturn => {
          setOpen(false);
          onConfirmData(dateReturn);
          setDate(dateReturn);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DataInput;
