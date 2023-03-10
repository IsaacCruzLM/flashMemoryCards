import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
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
        <TouchableOpacity onPress={() => showDialog()}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 3,
              borderColor: '#000',
              backgroundColor: background,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Portal>
          <Dialog
            style={{height: 380, padding: 8}}
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
            <Dialog.Actions
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Button onPress={() => hideDialog()} label="OK" />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default ColorPickerComponent;
