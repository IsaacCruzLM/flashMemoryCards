import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
} from '@react-navigation/native';

let _navigator: any;

function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<any> | null,
) {
  _navigator = navigatorRef;
}

function navigate(name: string, params?: object | undefined) {
  if (name === 'Home') {
    _navigator.dispatch(DrawerActions.closeDrawer());
  }
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
