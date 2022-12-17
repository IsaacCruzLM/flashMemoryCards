import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: themes.spacing.unit / 2,
    alignItems: 'center',
  },
  label: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeText,
    color: themes.colors.primary,
    fontWeight: '700',
    textAlignVertical: 'center',
  },
  content: {
    fontFamily: themes.fonts.regular.fontFamily,
    fontSize: themes.typography.fontSizeText,
    color: themes.colors.textColor2,
    fontWeight: '500',
  },
  chip: {
    marginHorizontal: 5,
    marginTop: 5,
    paddingVertical: themes.spacing.unit / 4,
    paddingHorizontal: themes.spacing.unit,
    borderRadius: 30,
  },
});

export default styles;
