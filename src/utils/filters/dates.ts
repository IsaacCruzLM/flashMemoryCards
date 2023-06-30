import {rangeDataType} from '../../components/DataRangeInput/types';

const DEFAULT_INIT_DATE = '1970-01-01T00:00:00.000Z';
const DEFAULT_END_DATE = '2999-01-01T00:00:00.000Z';

const rangeInputDateVerify = (data: rangeDataType, date: string) => {
  const initDate = new Date(
    new Date((data.init ? data.init : DEFAULT_INIT_DATE) as Date).setHours(
      0,
      0,
      0,
      0,
    ),
  ).getTime();
  const endDate = new Date(
    new Date((data.end ? data.end : DEFAULT_END_DATE) as Date).setHours(
      0,
      0,
      0,
      0,
    ),
  ).getTime();
  const verificatedDate = new Date(date).getTime();

  return initDate <= verificatedDate && endDate >= verificatedDate;
};

export default rangeInputDateVerify;
