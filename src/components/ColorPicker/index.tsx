import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import {Dialog, Portal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../styles/themes';

import Button from '../Button';

import styles from './styles';
import {ColorPickerProps} from './types';

const ColorPickerComponent = ({
  value = '#fff',
  iconName,
  onChangeColor,
}: ColorPickerProps) => {
  const [background, setBackground] = useState(value);
  const [visible, setVisible] = React.useState(false);

  const handleChangeComplete = (color: string) => {
    setBackground(color);
    onChangeColor && onChangeColor(color);
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.labelStyle}>Cor do Icone</Text>
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
        {background !== '#fff' && iconName && (
          <View style={styles.infoContainer}>
            <Text style={styles.labelStyle}>Preview</Text>
            <Icon
              color={background}
              size={Theme.spacing.unit * 6}
              name={iconName}
              style={styles.iconStyle}
            />
          </View>
        )}
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
