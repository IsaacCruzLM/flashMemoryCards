import get from 'lodash/get';
import useGetFromGlobalState from '../useGetFromGlobalState';

const useFilterBySearchParams = (
  defaultData: Array<any> = [],
  screenName: string = '',
  searchDataPath: string,
) => {
  const searchQuery = useGetFromGlobalState(`searchParams.${screenName}`, '');
  return searchQuery
    ? defaultData.filter((item: any) =>
        get(item, searchDataPath, '').includes(searchQuery),
      )
    : defaultData;
};

export default useFilterBySearchParams;
