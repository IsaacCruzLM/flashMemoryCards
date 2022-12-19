import * as React from 'react';
import {TextInput as PaperTextInput} from 'react-native-paper';

import {TextInputProps} from './types';

const TextInput = ({
  label,
  setText,
  placeholder,
  value,
  ...otherProps
}: TextInputProps) => {
  return (
    <PaperTextInput
      label={label}
      onChangeText={text => setText(text)}
      placeholder={placeholder}
      value={value}
      {...otherProps}
    />
  );
};

export default TextInput;
