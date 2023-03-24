import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
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
  numberNotesToReview = 0,
  onPress,
}: CategoryListCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <Card.Content style={styles.contentContainer}>
            <Icon
              color={themes.colors.primary}
              size={themes.spacing.unit * 5}
              name={icon}
            />
            <View style={styles.contentInfoContainer}>
              <Text numberOfLines={1} style={styles.categoryTitle}>
                {title}
              </Text>
              <View style={styles.subInfoContainer}>
                <Text
                  style={styles.infoText}>{`${numberOfNotes} anotações`}</Text>
                <Text style={styles.infoText}>{creationDate}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        {numberNotesToReview > 0 && (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{numberNotesToReview}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryListCard;
