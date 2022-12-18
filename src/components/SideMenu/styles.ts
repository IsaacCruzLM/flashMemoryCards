import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    height: '90%',
  },
  labelStyle: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    color: themes.colors.textColor1,
    fontWeight: '700',
    marginLeft: -16,
  },
});

export default styles;
