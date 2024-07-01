import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    height: 36,
    width: '100%',
    marginBottom: themes.spacing.unit * 6,
  },
  inputDefaultStyle: {
    fontSize: themes.typography.fontSizeTitle,
    borderColor: themes.colors.error,
  },
  errorInputStyle: {
    borderColor: themes.colors.error,
  },
  error: {
    color: themes.colors.error,
    marginLeft: themes.spacing.unit / 2,
    fontSize: themes.typography.fontSizeSmallText,
  },
});

export default styles;
