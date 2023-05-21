import React, {useState} from 'react';
import AppContext from './appContext';

export interface ProviderProps {
  children: JSX.Element | any;
}

const ContextProvider = ({children}: ProviderProps | any) => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  const globalState = {
    keyboardIsVisible,
  };

  const contextValue = {
    globalState,
    setKeyboardIsVisible,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
