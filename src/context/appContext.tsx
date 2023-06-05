import {createContext} from 'react';

interface globalStateType {
  keyboardIsVisible: boolean;
  showDialogEditNote: boolean;
  searchParams: object;
}

interface ContextType {
  globalState: globalStateType;
  setKeyboardIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDialogEditNote: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchParamsFunction: React.Dispatch<React.SetStateAction<object>>;
}

const AppContext = createContext<ContextType>({
  globalState: {
    keyboardIsVisible: false,
    showDialogEditNote: false,
    searchParams: {},
  },
  setKeyboardIsVisible: () => {},
  setShowDialogEditNote: () => {},
  setSearchParamsFunction: () => {},
});

export default AppContext;
