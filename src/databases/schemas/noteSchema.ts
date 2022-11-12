import {tableSchema} from '@nozbe/watermelondb';

export const noteSchema = tableSchema({
  name: 'notes',
  columns: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'initial_date',
      type: 'string',
    },
    {
      name: 'module_id',
      type: 'string',
    },
  ],
});
