import {appSchema} from '@nozbe/watermelondb';

import {categorySchema} from './categorySchema';
import {noteSchema} from './noteSchema';
import {noteSubjectSchema} from './noteSubjectSchema';
import {subjectSchema} from './subjectSchema';

export const schemas = appSchema({
  version: 1,
  tables: [categorySchema, noteSchema, noteSubjectSchema, subjectSchema],
});
