import get from 'lodash/get';

const getErrorLabel = (errors: Object, field: keyof Object): string =>
  get(errors, field, '') as unknown as string;

export default getErrorLabel;
