import {appSchema} from '@nozbe/watermelondb';

import {moduleSchema} from './moduleSchema';

export const schemas = appSchema({
  version: 1,
  tables: [moduleSchema],
});
