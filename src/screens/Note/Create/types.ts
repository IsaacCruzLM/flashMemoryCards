import {DefaultFormProps} from '../../../components/Form/types';

export interface CreateProps extends DefaultFormProps {
  route: object;
}

export interface CreateFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  category: string;
  subjects: [string];
  content: string;
  name: string;
}
