import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Q} from '@nozbe/watermelondb';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextEditor from '../../../components/TextEditor';
import Button from '../../../components/Button';
import Dialog from '../../../components/Dialog';
import TextInput from '../../../components/TextInput';
import Select from '../../../components/Select';
import SelectMultiple from '../../../components/SelectMultiple';

import AppContext from '../../../context/appContext';
import WmdbUtils from '../../../databases/utils';
import NavigationService from '../../../navigation/NavigationService';
import {translateOptions} from '../Create';

import styles from './styles';
import {ShowProps} from './types';
import {CategoryModelType} from '../../../databases/models/categoryModel';
import {NoteSubjectModelType} from '../../../databases/models/noteSubjectModel';

const Show: React.FunctionComponent<ShowProps | any> = ({
  route,
  note,
  categories,
  subjects,
  noteSubjects = [],
}) => {
  const {globalState, setShowDialogEditNote} = useContext(AppContext);
  const [newContent, setNewContent] = useState(note.content);
  const [newInfo, setNewInfo] = useState({
    name: get(note, 'name', ''),
    category: get(note, 'category.id', ''),
    subjects: noteSubjects.map((noteSubject: NoteSubjectModelType) =>
      get(noteSubject, 'subject.id'),
    ),
  });

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

  const updateAction = async () => {
    const noteId = get(route, 'params.noteId', '');
    const newDataObject = cloneDeep(newInfo);
    const M2MRelationships = get(newDataObject, 'subjects', []).map(
      (id: String) => ({
        type: 'subject',
        id,
      }),
    );
    const categoryRelationshipId = get(newDataObject, 'category', '');
    delete newDataObject.subjects;
    delete newDataObject.category;

    await WmdbUtils.updateItemWithM2MRelationInWMDB(
      'notes',
      {
        ...newDataObject,
        relationships: [
          {
            type: 'category',
            id: categoryRelationshipId,
          },
        ],
      },
      noteId,
      'note_subjects',
      M2MRelationships,
      'note_id',
      'note',
    );

    setShowDialogEditNote(false);
  };

  const handleInfoChange = (
    key: 'name' | 'category' | 'subjects',
    value: string | string[],
  ) => {
    const newInfoClone = cloneDeep(newInfo);
    newInfoClone[key] = value;
    setNewInfo(newInfoClone);
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
      <Dialog
        actions={[
          {
            label: 'Fechar',
            buttonMode: 'outlined',
            buttonAction: () => setShowDialogEditNote(false),
          },
          {
            label: 'Atualizar',
            buttonMode: 'contained',
            buttonAction: () => updateAction(),
          },
        ]}
        isVisible={globalState.showDialogEditNote}
        hideDialog={() => setShowDialogEditNote(false)}
        title={'Atualizar informações da anotação'}>
        <View>
          <TextInput
            label={'Nome da anotação'}
            setText={value => handleInfoChange('name', value)}
            placeholder={'Nome da anotação'}
            value={newInfo.name}
          />
          <Select
            options={translateOptions(categories)}
            onChange={value => handleInfoChange('category', value)}
            modalTitle="Selecione uma categoria"
            inputLabel="Selecionar Categoria"
            inputPlaceHolder="Selecionar Categoria"
            defaultValue={newInfo.category}
          />
          <SelectMultiple
            options={translateOptions(subjects)}
            onChange={value => handleInfoChange('subjects', value)}
            modalTitle="Selecione vários assuntos"
            inputPlaceHolder="Selecionar Assuntos"
            defaultValue={newInfo.subjects}
          />
        </View>
      </Dialog>
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
      subjects: database.get('subjects').query(),
      noteSubjects: database
        .get('note_subjects')
        .query(Q.where('note_id', noteId)),
    };
  }),
)(Show);
