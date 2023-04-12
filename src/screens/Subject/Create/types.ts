import {DefaultFormProps} from '../../../components/Form/types';
import {SubjectModelType} from '../../../databases/models/subjectModel';

export interface CreateProps extends DefaultFormProps {
  route: object;
  subject: SubjectModelType;
}

export interface CreateFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  name: string;
  color: string;
}
