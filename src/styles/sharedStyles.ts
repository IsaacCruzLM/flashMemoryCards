import {StyleSheet} from 'react-native';
import themes from './themes';

const sharedStyles = StyleSheet.create({
  //Used when you have more tha one icon in the header of the screen
  headerRightIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconWithMargin: {
    marginHorizontal: themes.spacing.unit * 1.3,
  },
});

export default sharedStyles;
