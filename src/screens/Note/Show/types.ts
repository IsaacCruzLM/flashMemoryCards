import {DefaultFormProps} from '../../../components/Form/types';
import {NoteModelType} from '../../../databases/models/noteModel';
import {CategoryModelType} from '../../../databases/models/categoryModel';
import {SubjectModelType} from '../../../databases/models/subjectModel';
import {NoteSubjectModelType} from '../../../databases/models/noteSubjectModel';

export interface ShowProps extends DefaultFormProps {
  route: object;
  note: NoteModelType;
  categories: CategoryModelType[];
  subjects: SubjectModelType[];
  noteSubjects: NoteSubjectModelType[];
}
