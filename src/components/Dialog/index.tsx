import * as React from 'react';
import {Button, Dialog as DialogPaper} from 'react-native-paper';

import {DialogProps} from './types';

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
      <DialogPaper.Title>{title}</DialogPaper.Title>
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
      </DialogPaper.Content>
      <DialogPaper.Actions>
        {actions.map(({label, buttonMode, buttonAction}) => (
          <Button mode={buttonMode} onPress={buttonAction}>
            {label}
          </Button>
        ))}
      </DialogPaper.Actions>
    </DialogPaper>
  );
};

export default Dialog;
