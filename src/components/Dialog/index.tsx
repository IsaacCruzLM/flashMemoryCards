import * as React from 'react';
import {Dialog as DialogPaper} from 'react-native-paper';
import Button from '../Button';

import styles from './styles';
import {DialogProps} from './types';
import {View} from 'react-native';

const Dialog = ({
  isVisible,
  hideDialog,
  title,
  children,
  actions,
  ...props
}: DialogProps) => {
  return (
    <DialogPaper visible={isVisible} onDismiss={hideDialog}>
      <DialogPaper.Title style={styles.title}>{title}</DialogPaper.Title>
      <DialogPaper.Content>
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
        {
          <View style={styles.actionsContainer}>
            {actions.map(
              ({label, buttonMode, buttonAction, loading = false}, index) => (
                <Button
                  key={`${label}-${index}`}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={[styles.button, {marginLeft: index === 0 ? 0 : 8}]}
                  modeParam={buttonMode}
                  onPress={buttonAction}
                  label={label}
                  loading={loading}
                />
              ),
            )}
          </View>
        }
      </DialogPaper.Content>
    </DialogPaper>
  );
};

export default Dialog;
