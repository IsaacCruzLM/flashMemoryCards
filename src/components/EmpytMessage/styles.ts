import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: themes.spacing.unit * 8,
  },
  title: {
    fontWeight: '700',
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle,
    color: themes.colors.primary,
    marginBottom: themes.spacing.unit,
  },
  message: {
    fontWeight: '500',
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    color: themes.colors.text,
    marginBottom: themes.spacing.unit * 6,
  },
});

export default styles;
