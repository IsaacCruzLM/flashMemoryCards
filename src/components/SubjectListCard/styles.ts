import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  cardContainer: {
    borderRadius: 10,
  },
  headerBackground: {
    backgroundColor: themes.colors.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerTitle: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    color: themes.colors.background,
    fontWeight: '700',
  },
  contentContainer: {
    padding: themes.spacing.unit,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentInfoContainer: {
    marginLeft: themes.spacing.unit * 3,
    flex: 1,
  },
  subjectTitle: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    color: themes.colors.primary,
    fontWeight: '700',
    marginLeft: themes.spacing.unit * 2,
  },
  iconColorView: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default styles;
