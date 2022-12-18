import * as React from 'react';
import {View} from 'react-native';

import styles from './styles';

import {DefaultContainerViewProps} from './types';

const DefaultContainerView = ({
  customStyle,
  children,
  ...props
}: DefaultContainerViewProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      {children.length
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
    </View>
  );
};

export default DefaultContainerView;
