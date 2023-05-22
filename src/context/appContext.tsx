import {createContext} from 'react';

interface globalStateType {
  keyboardIsVisible: boolean;
  showDialogEditNote: boolean;
}

interface ContextType {
  globalState: globalStateType;
  setKeyboardIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDialogEditNote: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<ContextType>({
  globalState: {
    keyboardIsVisible: false,
    showDialogEditNote: false,
  },
  setKeyboardIsVisible: () => {},
  setShowDialogEditNote: () => {},
});

export default AppContext;
