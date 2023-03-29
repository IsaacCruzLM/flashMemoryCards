import {DefaultFormProps} from '../../../components/Form/types';

export interface CreateFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  name: string;
  icon: string;
  color: string;
}
