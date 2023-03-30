import {StyleSheet} from 'react-native';
import themes from '../../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formContainer: {
    width: '100%',
  },
  createButton: {
    marginBottom: themes.spacing.unit * 3,
  },
  listHeader: {
    fontWeight: '700',
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeLargeTitle,
    color: themes.colors.primary,
    marginBottom: themes.spacing.unit * 2,
  },
  sectionList: {
    flex: 1,
    width: '100%',
  },
  cardCustomStyle: {
    marginBottom: themes.spacing.unit * 1.5,
  },
  listContainer: {
    paddingVertical: themes.spacing.unit * 3,
    paddingHorizontal: themes.spacing.unit * 2 + 4,
  },
});

export default styles;
