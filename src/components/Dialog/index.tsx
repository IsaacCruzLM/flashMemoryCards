import * as React from 'react';
import {Button, Dialog as DialogPaper, Portal, Text} from 'react-native-paper';

import {DialogProps} from './types';

const Dialog = ({isVisible, hideDialog, title}: DialogProps) => {
  return (
    <Portal>
      <DialogPaper visible={isVisible} onDismiss={hideDialog}>
        <DialogPaper.Title>{title}</DialogPaper.Title>
        <DialogPaper.Content>
          <Text variant="bodyMedium">This is simple DialogPaper</Text>
        </DialogPaper.Content>
        <DialogPaper.Actions>
          <Button onPress={hideDialog}>Done</Button>
        </DialogPaper.Actions>
      </DialogPaper>
    </Portal>
  );
};

export default Dialog;
