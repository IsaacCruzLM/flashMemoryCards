import React from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextEditor from '../../../components/TextEditor';

import styles from './styles';
import {ShowProps} from './types';

const Show: React.FunctionComponent<ShowProps | any> = ({note}) => {
  console.log(note.content);
  return (
    <DefaultContainerView>
      <View style={styles.container}>
        <TextEditor
          initialContentHTML={note.content}
          onChange={() => {}}
          placeHolder="Escreva sua anotação aqui!"
        />
      </View>
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({route, database}: any) => {
    const categoryId = get(route, 'params.noteId', '');
    return {
      note: database.get('notes').findAndObserve(categoryId),
    };
  }),
)(Show);
