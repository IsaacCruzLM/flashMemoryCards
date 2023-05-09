import React, {LegacyRef} from 'react';
import {useRef, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import styles from './styles';

const TextEditor = () => {
  const richText = useRef() as LegacyRef<RichEditor> | undefined;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [descHTML, setDescHTML] = useState('');

  const richTextHandle = (descriptionText: string) => {
    if (descriptionText) {
      setDescHTML(descriptionText);
    } else {
      setDescHTML('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.richTextContainer}>
        <ScrollView>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="Write your cool content here :)"
            style={styles.richTextEditorStyle}
            initialHeight={Dimensions.get('screen').height - 50}
            scrollEnabled={false}
          />
        </ScrollView>
        <RichToolbar
          editor={richText}
          selectedIconTint="#873c1e"
          iconTint="#312921"
          actions={[
            actions.insertImage,
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
