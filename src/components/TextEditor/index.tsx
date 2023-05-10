import React, {LegacyRef, useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import Theme from '../../styles/themes';

import {TextEditorProps} from './types';
import styles from './styles';

const TextEditor = ({onChange, placeHolder}: TextEditorProps) => {
  const richText = useRef() as LegacyRef<RichEditor> | undefined;

  const richTextHandle = (descriptionText: string) => {
    onChange(descriptionText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.richTextContainer}>
        <ScrollView>
          <RichEditor
            ref={richText}
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
    </View>
  );
};

export default TextEditor;
