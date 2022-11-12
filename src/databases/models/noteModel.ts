import {Model} from '@nozbe/watermelondb';
import {field, relation} from '@nozbe/watermelondb/decorators';

export class NoteModel extends Model {
  static table = 'notes';

  static associations = {
    note_subjects: {type: 'has_many', foreignKey: 'note_id'},
  } as const;

  @field('title')
  name!: string;

  @field('content')
  title!: string;

  @field('initial_date')
  initialDate!: string;

  @relation('modules', 'module_id')
  module!: string;
}
