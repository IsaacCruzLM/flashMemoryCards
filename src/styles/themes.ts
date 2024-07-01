import {MD2LightTheme, configureFonts} from 'react-native-paper';

const fontConfig = {
  default: {
    bold: {fontFamily: 'Roboto-Bold'},
    regular: {fontFamily: 'Roboto-Regular'},
    medium: {fontFamily: 'Roboto-Medium'},
    light: {fontFamily: 'Roboto-Light'},
    thin: {fontFamily: 'Roboto-Thin'},
  },
};

export default {
  ...MD2LightTheme,
  myOwnProperty: true,
  spacing: {
    unit: 8,
  },
  roundness: 4,
  colors: {
    ...MD2LightTheme.colors,
    primary: '#22272E',
    background: '#FFFFFF',
    gray: '#EFEFEF',
    dark: '#030303',
    textColor1: '#000000B3',
    textColor2: '#162133',
    disabled: '#666688',
    red: '#F44336',
    amber: '#FFC107',
    green: '#4CAF50',
  },
  fonts: configureFonts(fontConfig),
  typography: {
    fontSizeLargeTitle: 20,
    fontSizeTitle: 16,
    fontSizeText: 14,
    fontSizeSmallText: 12,
  },
};
