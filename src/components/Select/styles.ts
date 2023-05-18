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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: themes.spacing.unit * 2,
    paddingHorizontal: themes.spacing.unit * 3,
  },
  modalTitle: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle,
    fontWeight: '600',
    color: themes.colors.primary,
    textAlign: 'left',
  },
  actionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: themes.spacing.unit * 2,
  },
});

export default styles;
