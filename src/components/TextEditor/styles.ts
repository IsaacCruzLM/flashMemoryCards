import {StyleSheet, Dimensions} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    height: '90%',
  },
  richTextContainer: {
    width: '100%',
    maxHeight: Dimensions.get('screen').height - 50,
  },
  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: themes.colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },
  richTextToolbarStyle: {
    backgroundColor: themes.colors.gray,
    borderColor: themes.colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
  },
});

export default styles;
