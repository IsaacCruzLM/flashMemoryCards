import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: themes.spacing.unit * 6,
  },
  colorPreview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#000',
  },
  dialogContainer: {
    height: 380,
    padding: 8,
  },
  dialogAction: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default styles;
