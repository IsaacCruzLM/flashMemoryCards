import {ReactNode} from 'react';
import {CategoryModelType} from '../../../databases/models/categoryModel';
import {NoteModelType} from '../../../databases/models/noteModel';

export interface ListProps {
  categories: Array<CategoryModelType>;
  notes: Array<NoteModelType>;
  children?: ReactNode;
}
