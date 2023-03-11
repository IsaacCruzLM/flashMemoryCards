import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import {Dialog, Portal} from 'react-native-paper';

import styles from './styles';
import Button from '../Button';
// import {SelectIconProps} from './types';

const ColorPickerComponent = () => {
  const [background, setBackground] = useState('#fff');
  const [visible, setVisible] = React.useState(false);

  const handleChangeComplete = (color: string) => {
    setBackground(color);
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View>
        <Text>Cor do Icone</Text>
        <TouchableOpacity onPress={() => showDialog()}>
          <View
            style={[
              styles.colorPreview,
              {
                backgroundColor: background,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Portal>
          <Dialog
            style={styles.dialogContainer}
            visible={visible}
            onDismiss={hideDialog}>
            <Dialog.Content>
              <View>
                <ColorPicker
                  color={background}
                  onColorChangeComplete={handleChangeComplete}
                  thumbSize={40}
                  sliderSize={20}
                  noSnap={true}
                  row={false}
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogAction}>
              <Button onPress={() => hideDialog()} label="OK" />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default ColorPickerComponent;
