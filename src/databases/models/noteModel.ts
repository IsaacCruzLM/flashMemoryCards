import {Model, Q, Query} from '@nozbe/watermelondb';
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

  @field('level_revision')
  levelRevision!: number;

  @date('created_at')
  createdAt!: number;

  @date('last_revision')
  lastRevision!: number;

  @relation('categories', 'category_id')
  category!: string;

  @lazy
  subjects = this.collections
    .get('subjects')
    .query(Q.on('note_subjects', 'note_id', this.id));
}

export interface NoteModelType {
  id: string;
  name: string;
  content: string;
  levelRevision: number;
  createdAt: number;
  lastRevision: number;
  category: string;
  subjects: Query<any>;
}
