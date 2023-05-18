import {Model, Q} from '@nozbe/watermelondb';
import {field, relation, lazy, date} from '@nozbe/watermelondb/decorators';

export class NoteModel extends Model {
  static table = 'notes';

  static associations = {
    note_subjects: {type: 'has_many', foreignKey: 'note_id'},
  } as const;

  @field('name')
  name!: string;

  @field('content')
  content!: string;

  @date('created_at')
  createdAt!: number;

  @relation('categories', 'category_id')
  category!: string;

  @lazy
  subjects = this.collections
    .get('subjects')
    .query(Q.on('note_subjects', 'note_id', this.id));
}
