import React, {useState} from 'react';
import AppContext from './appContext';

export interface ProviderProps {
  children: JSX.Element | any;
}

const ContextProvider = ({children}: ProviderProps | any) => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [showDialogEditNote, setShowDialogEditNote] = useState(false);

  const globalState = {
    keyboardIsVisible,
    showDialogEditNote,
  };

  const contextValue = {
    globalState,
    setKeyboardIsVisible,
    setShowDialogEditNote,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
