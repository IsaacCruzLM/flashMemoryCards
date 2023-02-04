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
  },
});

export default styles;
