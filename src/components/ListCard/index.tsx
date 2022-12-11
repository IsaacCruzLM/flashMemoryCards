import * as React from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';

import styles from './styles';
import {ListCardProps} from './types';

const ListCard = ({title}: ListCardProps) => {
  return (
    <Card>
      <Card.Title title={title} style={styles.headerBackground} />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default ListCard;
