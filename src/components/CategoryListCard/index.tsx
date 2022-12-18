import * as React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Text} from 'react-native-paper';

import themes from '../../styles/themes';

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
        <Card.Content style={styles.contentContainer}>
          <Icon
            color={themes.colors.primary}
            size={themes.spacing.unit * 5}
            name={icon}
          />
          <View style={styles.contentInfoContainer}>
            <Text style={styles.categoryTitle}>{title}</Text>
            <View style={styles.subInfoContainer}>
              <Text
                style={
                  styles.numberOfNotesText
                }>{`${numberOfNotes} anotações`}</Text>
              <Text style={styles.creationDateText}>{creationDate}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CategoryListCard;
