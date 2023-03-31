import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {schemas} from './schemas';
import {CategoryModel} from './models/categoryModel';
import {NoteModel} from './models/noteModel';
import {NoteSubjectModel} from './models/noteSubjectModel';
import {SubjectModel} from './models/subjectModel';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [CategoryModel, NoteModel, NoteSubjectModel, SubjectModel],
});

export const logDatabase = () => console.log(database);
// logDatabase();
