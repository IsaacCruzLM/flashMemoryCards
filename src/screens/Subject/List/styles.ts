import {StyleSheet} from 'react-native';
import themes from '../../../styles/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingVertical: themes.spacing.unit * 3,
    paddingHorizontal: themes.spacing.unit * 2 + 4,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  itemStyle: {
    marginBottom: themes.spacing.unit * 1.5,
  },
});

export default styles;
