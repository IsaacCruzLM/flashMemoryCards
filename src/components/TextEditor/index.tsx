import React, {LegacyRef, useRef, useState, useEffect} from 'react';
import {View, Dimensions, Keyboard, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../styles/themes';

import {TextEditorProps} from './types';
import styles from './styles';

const TextEditor = ({
  onChange,
  placeHolder,
  initialContentHTML = '',
}: TextEditorProps) => {
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const richText = useRef() as LegacyRef<RichEditor> | any;

  const richTextHandle = (descriptionText: string) => {
    onChange(descriptionText);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.richTextContainer}>
        <ScrollView>
          <RichEditor
            ref={richText}
            initialContentHTML={initialContentHTML}
            onChange={richTextHandle}
            placeholder={placeHolder}
            style={styles.richTextEditorStyle}
            initialHeight={Dimensions.get('screen').height - 50}
            scrollEnabled={false}
          />
        </ScrollView>
        <RichToolbar
          editor={richText}
          selectedIconTint={Theme.colors.red}
          iconTint={Theme.colors.primary}
          actions={[
            // actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.setStrikethrough,
            actions.setUnderline,
          ]}
          style={styles.richTextToolbarStyle}
        />
      </View>
      {keyboardStatus === 'Keyboard Shown' ? (
        <View style={styles.containerFloatingButton}>
          <TouchableOpacity
            onPress={() =>
              richText !== null && richText !== undefined
                ? richText.current?.blurContentEditor()
                : null
            }>
            <Icon color={Theme.colors.primary} size={30} name="check" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default TextEditor;
