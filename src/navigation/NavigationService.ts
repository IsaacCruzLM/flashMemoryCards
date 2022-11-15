import {CommonActions} from '@react-navigation/native';

let _navigator: {dispatch: (arg0: any) => void};

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(name: string) {
  _navigator.dispatch(
    CommonActions.navigate({
      name,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
