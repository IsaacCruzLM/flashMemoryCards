import {useContext} from 'react';
import AppContext from '../../context/appContext';
import get from 'lodash/get';

const useGetFromGlobalState = (path = '', defaultValue = '' as any) => {
  const {globalState} = useContext(AppContext);
  const data = get(globalState, path, defaultValue);
  return data;
};

export default useGetFromGlobalState;
