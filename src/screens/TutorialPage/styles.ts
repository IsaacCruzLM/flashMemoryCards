import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 100,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infosContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  title: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle,
    color: themes.colors.background,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  subTitle: {
    fontFamily: themes.fonts.regular.fontFamily,
    fontSize: themes.typography.fontSizeText,
    color: themes.colors.background,
    textAlign: 'center',
    marginBottom: 70,
    fontWeight: '500',
  },
});

export default styles;
