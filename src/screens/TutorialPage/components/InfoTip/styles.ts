import {StyleSheet} from 'react-native';
import themes from '../../../../styles/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    color: themes.colors.background,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    fontFamily: themes.fonts.regular.fontFamily,
    fontSize: themes.typography.fontSizeText,
    color: themes.colors.background,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default styles;
