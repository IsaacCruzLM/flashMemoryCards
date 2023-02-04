import * as React from 'react';
import {View} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';

import themes from '../../styles/themes';

import styles from './styles';
import {TextInputProps} from './types';

const TextInput = ({
  label,
  setText,
  placeholder,
  value,
  style,
  ...otherProps
}: TextInputProps) => {
  return (
    <View style={styles.container}>
      <PaperTextInput
        mode="outlined"
        label={label}
        onChangeText={text => setText(text)}
        placeholder={placeholder}
        value={value}
        theme={themes}
        style={[styles.inputDefaultStyle, style]}
        {...otherProps}
      />
    </View>
  );
};

export default TextInput;
