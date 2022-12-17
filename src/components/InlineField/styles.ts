import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    marginVertical: themes.spacing.unit / 2,
    flexDirection: 'row',
  },
  label: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeText,
    color: themes.colors.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    fontFamily: themes.fonts.regular.fontFamily,
    fontSize: themes.typography.fontSizeText,
    color: themes.colors.textColor2,
    fontWeight: '500',
  },
});

export default styles;
