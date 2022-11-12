import {tableSchema} from '@nozbe/watermelondb';

export const noteSubjectSchema = tableSchema({
  name: 'note_subjects',
  columns: [
    {
      name: 'note_id',
      type: 'string',
    },
    {
      name: 'subject_id',
      type: 'string',
    },
  ],
});
