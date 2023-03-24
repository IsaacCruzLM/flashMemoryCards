import {contentProps} from '../InlineFieldChips/types';

export interface NoteListCardProps {
  title: string;
  creationDate: string;
  lastRevisionDate: string;
  noteType: string;
  category: string;
  subjects: contentProps[];
}
