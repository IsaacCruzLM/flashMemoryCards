import React from 'react';
import {View} from 'react-native';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextEditor from '../../../components/TextEditor';

import styles from './styles';
import {ShowProps} from './types';

const Show: React.FunctionComponent<ShowProps | any> = ({content}) => {
  return (
    <DefaultContainerView>
      <View style={styles.container}>
        <TextEditor
          initialContentHTML={content}
          onChange={() => {}}
          placeHolder="Escreva sua anotação aqui!"
        />
      </View>
    </DefaultContainerView>
  );
};

export default Show;
