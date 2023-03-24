import {createContext} from 'react';

interface globalStateType {
  currentCategoryName: string;
}

interface ContextType {
  globalState: globalStateType;
  setCurrentCategoryName: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<ContextType>({
  globalState: {
    currentCategoryName: '',
  },
  setCurrentCategoryName: () => {},
});

export default AppContext;
