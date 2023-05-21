import {createContext} from 'react';

interface globalStateType {
  keyboardIsVisible: boolean;
}

interface ContextType {
  globalState: globalStateType;
  setKeyboardIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<ContextType>({
  globalState: {
    keyboardIsVisible: false,
  },
  setKeyboardIsVisible: () => {},
});

export default AppContext;
