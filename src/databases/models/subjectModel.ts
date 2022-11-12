import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class SubjectModel extends Model {
  static table = 'subjects';

  static associations = {
    note_subjects: {type: 'has_many', foreignKey: 'subject_id'},
  } as const;

  @field('title')
  name!: string;
}
