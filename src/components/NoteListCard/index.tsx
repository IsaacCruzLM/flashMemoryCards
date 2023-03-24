import React from 'react';

import ListCard from '../../components/ListCard';
import InlineField from '../../components/InlineField';
import InlineFieldChips from '../../components/InlineFieldChips';

import {NoteListCardProps} from './types';

const NoteListCard = ({
  title,
  creationDate,
  lastRevisionDate,
  noteType,
  category,
  subjects,
}: NoteListCardProps) => {
  return (
    <ListCard title={title}>
      <InlineField label="Data de criação" content={creationDate} />
      <InlineField label="Ultima revisão" content={lastRevisionDate} />
      <InlineField label="Tipo de anotação" content={noteType} />
      <InlineField label="Categoria" content={category} />
      <InlineFieldChips label="Assuntos" arrayOfContents={subjects} />
    </ListCard>
  );
};

export default NoteListCard;
