import {DefaultFormProps} from '../../../components/Form/types';

export interface ListProps {
  route: object;
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
  noteType: string;
  category: string;
  subjects: Array<subjectData>;
}

export interface subjectData {
  content: string;
  color: string;
}
