import {DefaultFormProps} from '../../../components/Form/types';
import {NoteModelType} from '../../../databases/models/noteModel';

export interface ShowProps extends DefaultFormProps {
  note: NoteModelType;
}
