import {DefaultFormProps} from '../../../components/Form/types';
import {CategoryModelType} from '../../../databases/models/categoryModel';

export interface CreateProps extends DefaultFormProps {
  route: object;
  category: CategoryModelType;
}

export interface CreateFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  name: string;
  icon: string;
  color: string;
}
