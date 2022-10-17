import {appSchema} from '@nozbe/watermelondb';

import {moduleSchema} from './moduleSchema';
import {noteSchema} from './noteSchema';

export const schemas = appSchema({
  version: 1,
  tables: [moduleSchema, noteSchema],
});
