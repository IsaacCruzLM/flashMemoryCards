import * as React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Text} from 'react-native-paper';

import styles from './styles';
import {CategoryListCardProps} from './types';

const CategoryListCard = ({
  title,
  creationDate,
  numberOfNotes,
  icon,
}: CategoryListCardProps) => {
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <Card.Content style={styles.contentBackground}>
          <Icon color={'#000'} size={32} name={icon} />
          <View>
            <Text>{title}</Text>
            <View>
              <Text>{`${numberOfNotes} anotações`}</Text>
              <Text>{creationDate}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CategoryListCard;
