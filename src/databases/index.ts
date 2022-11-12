import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {schemas} from './schemas';
import {ModuleModel} from './models/moduleModel';
import {NoteModel} from './models/noteModel';
import {NoteSubjectModel} from './models/noteSubjectModel';
import {SubjectModel} from './models/subjectModel';

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [ModuleModel, NoteModel, NoteSubjectModel, SubjectModel],
});

console.log(database);
