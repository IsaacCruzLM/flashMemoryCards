import {tableSchema} from '@nozbe/watermelondb';

export const noteSchema = tableSchema({
  name: 'notes',
  columns: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'content',
      type: 'string',
    },
    {
      name: 'created_at',
      type: 'number',
    },
    {
      name: 'category_id',
      type: 'string',
    },
  ],
});
