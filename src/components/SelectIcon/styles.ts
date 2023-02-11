import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: themes.spacing.unit * 6,
  },
  labelStyle: {
    fontSize: themes.typography.fontSizeTitle,
    fontWeight: '700',
    color: themes.colors.textColor2,
    marginBottom: themes.spacing.unit * 2,
  },
  iconListContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
