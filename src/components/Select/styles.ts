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
    fontSize: themes.typography.fontSizeLargeTitle,
    fontWeight: '600',
    color: themes.colors.primary,
    textAlign: 'left',
    paddingLeft: themes.spacing.unit,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: themes.spacing.unit * 3,
  },
});

export default styles;
