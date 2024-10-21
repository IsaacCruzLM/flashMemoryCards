import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    marginBottom: themes.spacing.unit * 4,
    backgroundColor: 'gray',
    flexDirection: 'row',
    padding: themes.spacing.unit,
    alignItems: 'center',
    borderRadius: themes.spacing.unit * 2,
  },
  message: {
    color: themes.colors.background,
    marginLeft: themes.spacing.unit * 2,
    fontSize: themes.typography.fontSizeTitle,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default styles;
