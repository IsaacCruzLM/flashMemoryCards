import {rangeDataType} from '../../components/DataRangeInput/types';

const rangeInputDateVerify = (data: rangeDataType) => {
  const initDate = new Date(data.init as Date).getTime();
  const endDate = new Date(data.end as Date).getTime();
  const today = new Date().getTime();

  return initDate <= today && endDate >= today;
};

export default rangeInputDateVerify;
