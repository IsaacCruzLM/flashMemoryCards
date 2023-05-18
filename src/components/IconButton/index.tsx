import * as React from 'react';
import {IconButton as PaperIconButton} from 'react-native-paper';

import Theme from '../../styles/themes';

import {ButtonProps} from './types';

const IconButton = ({
  modeParam,
  iconName,
  iconSize,
  onPress = () => {},
  iconColorParam,
  backgroundColor,
  style,
  disabled = false,
}: ButtonProps) => {
  const mode = modeParam || 'outlined';

  const iconColor =
    iconColorParam ||
    (mode === 'outlined' ? Theme.colors.dark : Theme.colors.background);

  const getDefaultStyle = () => {
    let defaultStyle;
    switch (mode) {
      case 'outlined':
        defaultStyle = {borderWidth: 2, borderColor: Theme.colors.dark};
        break;
      case 'contained':
        defaultStyle = {backgroundColor: backgroundColor || Theme.colors.dark};
        break;
      default:
        defaultStyle = {};
        break;
    }
    return defaultStyle;
  };

  return (
    <PaperIconButton
      disabled={disabled}
      icon={iconName}
      iconColor={iconColor}
      size={iconSize || Theme.spacing.unit * 3.5}
      onPress={onPress}
      style={[getDefaultStyle(), style]}
    />
  );
};

export default IconButton;
