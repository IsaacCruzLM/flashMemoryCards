import * as React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';

import styles from './styles';
import {ListCardProps} from './types';

const ListCard = ({
  title,
  children,
  containerStyle = {},
  ...props
}: ListCardProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Card style={styles.cardContainer}>
        <Card.Title
          title={title}
          titleStyle={styles.headerTitle}
          style={styles.headerBackground}
        />
        <Card.Content style={styles.contentBackground}>
          {children && children.length
            ? children.map((child: Element, index: number) =>
                React.isValidElement(child)
                  ? React.cloneElement(child, {
                      key: index,
                      ...(props as object),
                      ...(child.props as object),
                    })
                  : null,
              )
            : React.isValidElement(children)
            ? React.cloneElement(children, {
                ...(props as object),
                ...(children.props as object),
              })
            : null}
        </Card.Content>
      </Card>
    </View>
  );
};

export default ListCard;
