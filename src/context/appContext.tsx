import {createContext} from 'react';

interface globalStateType {
  currentCategory: {name: string; id: string};
}

interface ContextType {
  globalState: globalStateType;
  setCurrentCategory: React.Dispatch<
    React.SetStateAction<{name: string; id: string}>
  >;
}

const AppContext = createContext<ContextType>({
  globalState: {
    currentCategory: {name: '', id: ''},
  },
  setCurrentCategory: () => {},
});

export default AppContext;
