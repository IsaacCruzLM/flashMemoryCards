import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import {LinearGradientViewProps} from './types';

const LinearGradientView = ({
  colors = ['rgba(34, 39, 46, 0.7)', 'rgba(34, 39, 46, 1)'],
  containerStyle,
  children,
  ...props
}: LinearGradientViewProps) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.linearGradient, containerStyle]}>
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
    </LinearGradient>
  );
};

export default LinearGradientView;
