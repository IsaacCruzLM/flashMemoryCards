import {DefaultFormProps} from '../../../components/Form/types';

export interface NewCategoryFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  nome: string;
  icon: string;
  color: string;
}
