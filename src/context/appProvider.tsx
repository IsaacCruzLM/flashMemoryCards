import React, {useState} from 'react';
import AppContext from './appContext';

export interface ProviderProps {
  children: JSX.Element | any;
}

const ContextProvider = ({children}: ProviderProps | any) => {
  const [currentCategoryName, setCurrentCategoryName] = useState('');

  const globalState = {
    currentCategoryName,
  };

  const contextValue = {
    globalState,
    setCurrentCategoryName,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
