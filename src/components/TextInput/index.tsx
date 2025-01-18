import * as React from 'react';
import {View, Text} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';

import themes from '../../styles/themes';

import ErrorWarning from '../ErrorWarning';
import ErrorBoundary from '../ErrorBoundary';

import styles from './styles';
import {TextInputProps} from './types';

const TextInput = ({
  label,
  setText,
  placeholder,
  value,
  style,
  onBlur,
  error = false,
  errorLabel = '',
  ...otherProps
}: TextInputProps) => {
  return (
    <View style={styles.container}>
      <ErrorBoundary
        fallback={
          <View>
            <Text>Teste</Text>
          </View>
        }>
        <PaperTextInput
          mode="outlined"
          label={label}
          onChangeText={text => setText(text)}
          placeholder={placeholder}
          value={value}
          theme={themes}
          onBlur={onBlur}
          error={error}
          style={[styles.inputDefaultStyle, style]}
          {...otherProps}
        />
      </ErrorBoundary>
      <ErrorWarning show={error} label={errorLabel} />
    </View>
  );
};

export default TextInput;
