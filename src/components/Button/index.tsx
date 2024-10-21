import * as React from 'react';
import {Button as PaperButton} from 'react-native-paper';

import Theme from '../../styles/themes';

import {ButtonProps} from './types';

const Button = ({
  modeParam,
  icon,
  label,
  onPress = () => {},
  buttonColorParam,
  textColorParam,
  style,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const mode = modeParam || 'contained';
  const buttonColor = buttonColorParam || Theme.colors.dark;
  const textColor =
    textColorParam || mode === 'contained'
      ? Theme.colors.background
      : Theme.colors.dark;

  const getDefaultStyle = () => {
    let defaultStyle;
    switch (mode) {
      case 'outlined':
        defaultStyle = {borderWidth: 2, borderColor: Theme.colors.dark};
        break;
      case 'contained':
      case 'text':
      default:
        defaultStyle = {};
        break;
    }
    return defaultStyle;
  };

  return (
    <PaperButton
      disabled={disabled}
      loading={loading}
      icon={icon}
      mode={mode}
      onPress={onPress}
      buttonColor={mode === 'contained' ? buttonColor : ''}
      textColor={textColor}
      style={[getDefaultStyle(), style]}>
      {label}
    </PaperButton>
  );
};

export default Button;
