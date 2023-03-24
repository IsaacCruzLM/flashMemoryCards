import {createContext} from 'react';

interface ContextType {
  globalState: object;
  setCurrentCategoryName: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<ContextType>({
  globalState: {},
  setCurrentCategoryName: () => {},
});

export default AppContext;
