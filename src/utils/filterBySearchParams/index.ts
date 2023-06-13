import get from 'lodash/get';
import useGetFromGlobalSate from '../getFromGlobalState';

const useFilterBySearchParams = (
  defaultData: Array<any> = [],
  screenName: string = '',
  searchDataPath: string,
) => {
  const searchQuery = useGetFromGlobalSate(`searchParams.${screenName}`, '');
  return searchQuery
    ? defaultData.filter((item: any) =>
        get(item, searchDataPath, '').includes(searchQuery),
      )
    : defaultData;
};

export default useFilterBySearchParams;
