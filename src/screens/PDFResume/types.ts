import {DefaultFormProps} from '../../components/Form/types';
import {CategoryModelType} from '../../databases/models/categoryModel';
import {SubjectModelType} from '../../databases/models/subjectModel';
import {NoteSubjectModelType} from '../../databases/models/noteSubjectModel';

export interface PDFResumeProps extends DefaultFormProps {
  categories: CategoryModelType[];
  subjects: SubjectModelType[];
  noteSubjects: NoteSubjectModelType[];
}

export interface PDFResumeFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  pdf_name: string;
  categories: [] | string;
  subjects: [];
}
