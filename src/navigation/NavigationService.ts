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
  const navigateAction = () => {
    if (name === 'Home') {
      _navigator.dispatch(DrawerActions.closeDrawer());
    }
    _navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  };

  try {
    navigateAction();
  } catch (error: any) {
    if (
      error.message.includes("Cannot read property 'dispatch' of undefined")
    ) {
      setInterval(() => navigateAction(), 500);
    }
  }
}

function setParams(params: object) {
  _navigator.dispatch(CommonActions.setParams(params));
}

export default {
  navigate,
  setTopLevelNavigator,
  setParams,
};
