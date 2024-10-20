import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: themes.spacing.unit * 2.5,
  },
  title: {
    fontSize: themes.typography.fontSizeLargeTitle,
    fontWeight: 'bold',
    marginBottom: themes.spacing.unit * 2.5,
    color: themes.colors.primary,
  },
  section: {
    marginBottom: themes.spacing.unit * 2.5,
  },
  subtitle: {
    fontSize: themes.typography.fontSizeTitle,
    fontWeight: 'bold',
    marginBottom: themes.spacing.unit * 1.25,
    color: themes.colors.primary,
  },
  text: {
    fontSize: themes.typography.fontSizeText,
    lineHeight: themes.spacing.unit * 3,
    color: themes.colors.text,
  },
  sectionVersion: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  subtitleVersion: {
    fontSize: themes.typography.fontSizeTitle,
    fontWeight: 'bold',
    color: themes.colors.primary,
    textAlign: 'center',
  },
  textVersion: {
    fontSize: themes.typography.fontSizeText,
    lineHeight: themes.spacing.unit * 3,
    color: themes.colors.text,
    textAlign: 'center',
  },
});

export default styles;
