import {DefaultFormProps} from '../../../components/Form/types';
import {rangeDataType} from '../../../components/DataRangeInput/types';

import {NoteModelType} from '../../../databases/models/noteModel';
import {NoteSubjectModelType} from '../../../databases/models/noteSubjectModel';
import {CategoryModelType} from '../../../databases/models/categoryModel';
import {SubjectModelType} from '../../../databases/models/subjectModel';

export interface ListProps {
  route?: object;
  notes?: NoteModelType[];
  category?: CategoryModelType;
  noteSubjects?: NoteSubjectModelType[];
  categories: CategoryModelType[];
  subjects: SubjectModelType[];
}

export interface NewCategoryFormProps extends DefaultFormProps {
  values: formValues;
}

export interface formValues {
  nome: string;
  icon: string;
  color: string;
}

export interface sectionData {
  title: string;
  data: Array<CardData>;
}

export interface CardData {
  id: string;
  title: string;
  creationDate: string;
  lastRevisionDate: string;
  nextRevisionDate: string;
  noteType: string;
  category: string;
  subjects: Array<subjectData>;
  levelRevision?: number;
  needRevision?: boolean;
}

export interface subjectData {
  content: string;
  color: string;
}

export interface filterState {
  category: string;
  subjects: string[];
  creationDate: rangeDataType;
  lastRevision: rangeDataType;
  nextRevision: rangeDataType;
}

export interface filterProps extends ListProps {
  filters: filterState;
  handleFilterChange: Function;
  dontShowCategory?: boolean;
}
