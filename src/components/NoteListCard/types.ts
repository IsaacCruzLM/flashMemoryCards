import {contentProps} from '../InlineFieldChips/types';

export interface NoteListCardProps {
  title: string;
  creationDate: string;
  lastRevisionDate: string;
  nextRevisionDate?: string;
  noteType: string;
  category: string;
  subjects: contentProps[];
  containerStyle?: object;
  onPress?: () => void;
}
