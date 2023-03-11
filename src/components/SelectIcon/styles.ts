import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: themes.spacing.unit * 2,
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
  defaultIconContainer: {
    width: themes.spacing.unit * 6,
    height: themes.spacing.unit * 6,
    borderRadius: themes.spacing.unit * 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: themes.spacing.unit,
  },
  selectedIconContainer: {
    width: themes.spacing.unit * 6,
    height: themes.spacing.unit * 6,
    borderRadius: themes.spacing.unit * 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: themes.spacing.unit,
    backgroundColor: themes.colors.red,
  },
});

export default styles;
