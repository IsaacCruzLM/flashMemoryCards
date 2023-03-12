import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: themes.spacing.unit * 6,
  },
  colorPreview: {
    width: themes.spacing.unit * 6,
    height: themes.spacing.unit * 6,
    borderRadius: themes.spacing.unit * 3,
    borderWidth: 3,
    borderColor: '#000',
    margin: themes.spacing.unit,
  },
  dialogContainer: {
    height: 380,
    padding: 8,
  },
  dialogAction: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  labelStyle: {
    fontSize: themes.typography.fontSizeTitle,
    fontWeight: '700',
    color: themes.colors.textColor2,
    marginBottom: themes.spacing.unit,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    margin: themes.spacing.unit,
  },
});

export default styles;
