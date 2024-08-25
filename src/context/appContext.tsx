import {createContext} from 'react';

interface globalStateType {
  keyboardIsVisible: boolean;
  showDialogEditNote: boolean;
  showDialogDeleteNote: boolean;
  searchParams: object;
  isOpenSearchBar: boolean;
  filterDialogOpen: object;
}

interface ContextType {
  globalState: globalStateType;
  setKeyboardIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDialogEditNote: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDialogDeleteNote: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchParamsFunction: React.Dispatch<React.SetStateAction<object>>;
  setIsOpenSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterDialogOpenFunction: React.Dispatch<React.SetStateAction<object>>;
}

const AppContext = createContext<ContextType>({
  globalState: {
    keyboardIsVisible: false,
    showDialogEditNote: false,
    showDialogDeleteNote: false,
    searchParams: {},
    isOpenSearchBar: false,
    filterDialogOpen: {},
  },
  setKeyboardIsVisible: () => {},
  setShowDialogEditNote: () => {},
  setShowDialogDeleteNote: () => {},
  setSearchParamsFunction: () => {},
  setIsOpenSearchBar: () => {},
  setFilterDialogOpenFunction: () => {},
});

export default AppContext;
