import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    marginBottom: themes.spacing.unit,
  },
  error: {
    color: themes.colors.error,
    marginLeft: themes.spacing.unit / 2,
    fontSize: themes.typography.fontSizeSmallText,
  },
});

export default styles;
