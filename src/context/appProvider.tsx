import React, {ReactNode, useState} from 'react';
import AppContext from './appContext';

export interface ProviderProps {
  children: ReactNode;
}

const ContextProvider = ({children}: ProviderProps | any) => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [showDialogEditNote, setShowDialogEditNote] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);

  const setSearchParamsFunction = (newParam: object) =>
    setSearchParams({...searchParams, ...newParam});

  const globalState = {
    keyboardIsVisible,
    showDialogEditNote,
    searchParams,
    isOpenSearchBar,
  };

  const contextValue = {
    globalState,
    setKeyboardIsVisible,
    setShowDialogEditNote,
    setSearchParamsFunction,
    setIsOpenSearchBar,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
