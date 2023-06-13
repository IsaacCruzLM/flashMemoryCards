import {useContext} from 'react';
import AppContext from '../../context/appContext';
import get from 'lodash/get';

const useGetFromGlobalState = (path = '', defaultValue = '') => {
  const {globalState} = useContext(AppContext);
  const data = get(globalState, path, defaultValue);
  return data;
};

export default useGetFromGlobalState;
