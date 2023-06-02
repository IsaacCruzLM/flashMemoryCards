import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  title: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle,
    color: themes.colors.textColor1,
    fontWeight: '700',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: themes.spacing.unit * 3,
  },
  button: {
    flex: 1,
  },
});

export default styles;
