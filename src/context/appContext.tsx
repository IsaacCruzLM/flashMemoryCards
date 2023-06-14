import {createContext} from 'react';

interface globalStateType {
  keyboardIsVisible: boolean;
  showDialogEditNote: boolean;
  searchParams: object;
  isOpenSearchBar: boolean;
}

interface ContextType {
  globalState: globalStateType;
  setKeyboardIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDialogEditNote: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchParamsFunction: React.Dispatch<React.SetStateAction<object>>;
  setIsOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<ContextType>({
  globalState: {
    keyboardIsVisible: false,
    showDialogEditNote: false,
    searchParams: {},
    isOpenSearchBar: false,
  },
  setKeyboardIsVisible: () => {},
  setShowDialogEditNote: () => {},
  setSearchParamsFunction: () => {},
  setIsOpenSearchBar: () => {},
});

export default AppContext;
