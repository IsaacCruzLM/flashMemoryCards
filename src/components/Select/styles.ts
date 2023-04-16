import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  itemStyle: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    fontWeight: '600',
    color: themes.colors.primary,
    padding: themes.spacing.unit * 3,
    textAlign: 'left',
  },
});

export default styles;
