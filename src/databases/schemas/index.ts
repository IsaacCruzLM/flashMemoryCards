import {appSchema} from '@nozbe/watermelondb';

import {moduleSchema} from './moduleSchema';
import {noteSchema} from './noteSchema';
import {noteSubjectSchema} from './noteSubjectSchema';
import {subjectSchema} from './subjectSchema';

export const schemas = appSchema({
  version: 1,
  tables: [moduleSchema, noteSchema, noteSubjectSchema, subjectSchema],
});
