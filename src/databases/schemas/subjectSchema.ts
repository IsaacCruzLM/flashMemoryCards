import {tableSchema} from '@nozbe/watermelondb';

export const subjectSchema = tableSchema({
  name: 'subjects',
  columns: [
    {
      name: 'title',
      type: 'string',
    },
  ],
});
