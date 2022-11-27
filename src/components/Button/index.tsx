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
}: ButtonProps) => {
  const mode = modeParam || 'contained';
  const buttonColor = buttonColorParam || Theme.colors.dark;
  const textColor = textColorParam || Theme.colors.background;

  return (
    <PaperButton
      icon={icon}
      mode={mode}
      onPress={onPress}
      buttonColor={buttonColor}
      textColor={textColor}
      style={[style]}>
      {label}
    </PaperButton>
  );
};

export default Button;
