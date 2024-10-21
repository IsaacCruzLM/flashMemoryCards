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
      name: 'level_revision',
      type: 'number',
    },
    {
      name: 'created_at',
      type: 'number',
    },
    {
      name: 'last_revision',
      type: 'number',
    },
    {
      name: 'next_revision',
      type: 'number',
    },
    {
      name: 'category_id',
      type: 'string',
    },
  ],
});
