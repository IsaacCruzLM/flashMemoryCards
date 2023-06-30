import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {DataInputProps} from './types';
import TextInput from '../TextInput';

const DataInput = ({
  label,
  placeHolder,
  onConfirmData,
  textInputStyle,
  containerStyle,
  defaultValue = null,
}: DataInputProps) => {
  const [date, setDate] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            setText={() => {}}
            placeholder={placeHolder}
            value={date ? date.toLocaleDateString('pt-BR') : ''}
            style={textInputStyle}
          />
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date === null ? new Date() : date}
        onConfirm={dateReturn => {
          setOpen(false);
          onConfirmData(dateReturn);
          setDate(dateReturn);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        locale="pt-BR"
        is24hourSource="locale"
      />
    </View>
  );
};

export default DataInput;
