import {StyleSheet} from 'react-native';
import themes from '../../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginVertical: themes.spacing.unit * 4,
  },
  title: {
    fontWeight: '700',
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle + 8,
    color: themes.colors.primary,
    marginBottom: themes.spacing.unit,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: '600',
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle,
    color: themes.colors.textColor1,
    marginBottom: themes.spacing.unit,
    textAlign: 'center',
  },
});

export default styles;
