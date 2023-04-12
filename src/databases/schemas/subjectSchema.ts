import {tableSchema} from '@nozbe/watermelondb';

export const subjectSchema = tableSchema({
  name: 'subjects',
  columns: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'color',
      type: 'string',
    },
  ],
});
