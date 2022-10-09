import {tableSchema} from '@nozbe/watermelondb';

export const moduleSchema = tableSchema({
  name: 'modules',
  columns: [
    {
      name: 'name',
      type: 'string',
    },
  ],
});
