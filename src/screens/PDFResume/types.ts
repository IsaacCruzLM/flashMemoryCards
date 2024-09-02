import {DefaultFormProps} from '../../components/Form/types';
import {CategoryModelType} from '../../databases/models/categoryModel';
import {SubjectModelType} from '../../databases/models/subjectModel';

export interface PDFResumeProps extends DefaultFormProps {
  categories: CategoryModelType[];
  subjects: SubjectModelType[];
}

export interface PDFResumeFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  pdf_name: string;
  categories: [] | string;
  subjects: [];
}
