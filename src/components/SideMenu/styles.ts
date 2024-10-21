import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    height: '100%',
    paddingVertical: themes.spacing.unit * 2,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  labelStyle: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    color: themes.colors.textColor1,
    fontWeight: '700',
    marginLeft: -16,
  },
});

export default styles;
