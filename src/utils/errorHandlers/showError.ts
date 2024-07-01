import get from 'lodash/get';

const showError = (
  errors: Object,
  touched: Object,
  field: keyof Object,
): boolean =>
  get(errors, field, false) && (get(touched, field, false) as boolean);

export default showError;
