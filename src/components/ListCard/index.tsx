import * as React from 'react';
import {Card} from 'react-native-paper';

import InlineField from '../InlineField';
import InlineFieldChips from '../InlineFieldChips';

import styles from './styles';
import {ListCardProps} from './types';

const ListCard = ({
  title,
  creationDate,
  lastRevisionDate,
  noteType,
  category,
  subjects,
}: ListCardProps) => {
  return (
    <Card>
      <Card.Title title={title} style={styles.headerBackground} />
      <Card.Content>
        <InlineField label="Data de criação" content={creationDate} />
        <InlineField label="Ultima revisão" content={lastRevisionDate} />
        <InlineField label="Tipo de anotação" content={noteType} />
        <InlineField label="Categoria" content={category} />
        <InlineFieldChips label="Assuntos" arrayOfContents={subjects} />
      </Card.Content>
    </Card>
  );
};

export default ListCard;
