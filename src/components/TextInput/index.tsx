import * as React from 'react';
import {View} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';

import themes from '../../styles/themes';

import {TextInputProps} from './types';

const TextInput = ({
  label,
  setText,
  placeholder,
  value,
  ...otherProps
}: TextInputProps) => {
  return (
    <View style={{height: 36, width: '100%'}}>
      <PaperTextInput
        mode="outlined"
        label={label}
        onChangeText={text => setText(text)}
        placeholder={placeholder}
        value={value}
        theme={themes}
        {...otherProps}
      />
    </View>
  );
};

export default TextInput;
