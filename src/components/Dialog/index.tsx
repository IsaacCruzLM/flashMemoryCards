import * as React from 'react';
import {Button, Dialog as DialogPaper, Portal} from 'react-native-paper';

import {DialogProps} from './types';

const Dialog = ({
  isVisible,
  hideDialog,
  title,
  children,
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
        <Button onPress={hideDialog}>Done</Button>
      </DialogPaper.Actions>
    </DialogPaper>
  );
};

export default Dialog;
