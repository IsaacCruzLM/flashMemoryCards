import {StyleSheet} from 'react-native';
import themes from '../../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  stepIndicator: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    color: themes.colors.textColor1,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default styles;
