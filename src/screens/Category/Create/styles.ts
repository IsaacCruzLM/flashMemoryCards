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
    width: '100%',
  },
  createButton: {
    marginBottom: themes.spacing.unit * 3,
  },
});

export default styles;
