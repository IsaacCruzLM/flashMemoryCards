import {DefaultFormProps} from '../../../components/Form/types';
import {NoteModelType} from '../../../databases/models/noteModel';
import {CategoryModelType} from '../../../databases/models/categoryModel';

export interface ShowProps extends DefaultFormProps {
  route: object;
  note: NoteModelType;
  categories: CategoryModelType[];
}
