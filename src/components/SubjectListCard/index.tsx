import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

import styles from './styles';
import {SubjectListCardProps} from './types';

const SubjectListCard = ({
  title,
  subjectColor,
  onPress,
  containerStyle,
}: SubjectListCardProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={onPress}>
        <Card style={styles.cardContainer}>
          <Card.Content style={styles.contentContainer}>
            <View
              style={[styles.iconColorView, {backgroundColor: subjectColor}]}
            />
            <Text numberOfLines={1} style={styles.categoryTitle}>
              {title}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default SubjectListCard;
