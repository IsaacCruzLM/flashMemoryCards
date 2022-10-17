import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class NoteModel extends Model {
  static table = 'notes';

  @field('title')
  name!: string;

  @field('content')
  title!: string;

  @field('module_id')
  moduleId!: string;

  @field('student_id')
  studentId!: string;

  @field('initial_date')
  initialDate!: string;
}
