import {Model} from '@nozbe/watermelondb';
import {immutableRelation} from '@nozbe/watermelondb/decorators';

export class NoteSubjectModel extends Model {
  static table = 'note_subjects';

  static associations = {
    notes: {type: 'belongs_to', key: 'note_id'},
    subjects: {type: 'belongs_to', key: 'subject_id'},
  } as const;

  @immutableRelation('notes', 'note_id')
  note!: string;

  @immutableRelation('subjects', 'subject_id')
  subject!: string;
}

export interface NoteSubjectModelType {
  note: string;
  subject: string;
  _raw: RawNoteSubjectModelType;
}

export interface RawNoteSubjectModelType {
  note_id: string;
  subject_id: string;
}
