import React, {LegacyRef} from 'react';
import {useRef, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

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

const styles = StyleSheet.create({
  container: {
    height: '90%',
  },
  richTextContainer: {
    width: '100%',
    maxHeight: Dimensions.get('screen').height - 50,
  },
  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#ccaf9b',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },
  richTextToolbarStyle: {
    backgroundColor: '#c6c3b3',
    borderColor: '#c6c3b3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
  errorTextStyle: {
    color: '#FF0000',
    marginBottom: 10,
  },
  saveButtonStyle: {
    backgroundColor: '#c6c3b3',
    borderWidth: 1,
    borderColor: '#c6c3b3',
    borderRadius: 10,
    padding: 10,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#312921',
  },
});
