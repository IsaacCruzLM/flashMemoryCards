import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextEditor from '../../../components/TextEditor';
import Button from '../../../components/Button';

import AppContext from '../../../context/appContext';
import WmdbUtils from '../../../databases/utils';
import NavigationService from '../../../navigation/NavigationService';

import styles from './styles';
import {ShowProps} from './types';
import {CategoryModelType} from '../../../databases/models/categoryModel';

const Show: React.FunctionComponent<ShowProps | any> = ({
  route,
  note,
  categories,
}) => {
  const {globalState} = useContext(AppContext);
  const [newContent, setNewContent] = useState(note.content);

  const submitAction = async () => {
    const noteId = get(route, 'params.noteId', '');
    const category = categories.find(
      ({id}: CategoryModelType) => id === note.category.id,
    );
    await WmdbUtils.updateItemInWMDB('notes', {content: newContent}, noteId);
    NavigationService.navigate('Notes', {
      categoryName: get(category, 'name', ''),
      categoryId: get(category, 'id', ''),
    });
  };

  return (
    <DefaultContainerView>
      <View style={styles.container}>
        <View>
          <TextEditor
            initialContentHTML={note.content}
            onChange={content => setNewContent(content)}
            placeHolder="Escreva sua anotação aqui!"
          />
        </View>
        {globalState.keyboardIsVisible ? null : (
          <View>
            <Button label={'Salvar Anotação'} onPress={submitAction} />
          </View>
        )}
      </View>
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({route, database}: any) => {
    const noteId = get(route, 'params.noteId', '');
    return {
      note: database.get('notes').findAndObserve(noteId),
      categories: database.get('categories').query(),
    };
  }),
)(Show);
