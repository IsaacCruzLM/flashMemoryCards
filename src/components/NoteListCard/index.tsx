import React from 'react';

import ListCard from '../../components/ListCard';
import InlineField from '../../components/InlineField';
import InlineFieldChips from '../../components/InlineFieldChips';

import {NoteListCardProps} from './types';

const NoteListCard = ({
  title,
  creationDate,
  lastRevisionDate,
  nextRevisionDate,
  noteType,
  category,
  subjects,
  containerStyle = {},
  onPress,
}: NoteListCardProps) => {
  return (
    <ListCard onPress={onPress} title={title} containerStyle={containerStyle}>
      <InlineField label="Data de criação" content={creationDate} />
      <InlineField label="Última revisão" content={lastRevisionDate} />
      {nextRevisionDate ? (
        <InlineField label="Próxima revisão" content={nextRevisionDate} />
      ) : null}
      <InlineField label="Tipo de anotação" content={noteType} />
      <InlineField label="Categoria" content={category} />
      <InlineFieldChips label="Assuntos" arrayOfContents={subjects} />
    </ListCard>
  );
};

export default NoteListCard;
