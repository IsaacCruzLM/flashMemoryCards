import {StyleSheet} from 'react-native';
import themes from '../../styles/themes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: themes.spacing.unit * 2,
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
  iconColorView: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  fakeInputStyle: {
    minHeight: 58,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingHorizontal: themes.spacing.unit,
    paddingVertical: themes.spacing.unit,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  placeHolderStyle: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    fontWeight: '600',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: themes.spacing.unit * 0.7,
    height: 40,
  },
  chipContainer: {
    height: 32,
    backgroundColor: themes.colors.gray,
    alignSelf: 'flex-start',
    paddingVertical: themes.spacing.unit / 2,
    paddingHorizontal: themes.spacing.unit * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: themes.spacing.unit / 2,
  },
  chipText: {
    fontFamily: themes.fonts.medium.fontFamily,
    fontSize: themes.typography.fontSizeTitle,
    fontWeight: '600',
    textAlign: 'left',
    color: themes.colors.dark,
  },
  fakeLabelContainer: {
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  fakeLabel: {
    fontSize: themes.typography.fontSizeSmallText,
  },
});

export default styles;
