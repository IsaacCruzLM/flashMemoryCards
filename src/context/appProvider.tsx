import React, {useState} from 'react';
import AppContext from './appContext';

export interface ProviderProps {
  children: JSX.Element | any;
}

const ContextProvider = ({children}: ProviderProps | any) => {
  const [currentCategory, setCurrentCategory] = useState({
    name: '',
    id: '',
  });

  const globalState = {
    currentCategory,
  };

  const contextValue = {
    globalState,
    setCurrentCategory,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
