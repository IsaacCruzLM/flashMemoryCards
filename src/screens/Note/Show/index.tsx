import React, {useContext, useState} from 'react';
import {View} from 'react-native';
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

const Show: React.FunctionComponent<ShowProps | any> = ({
  route,
  note,
  categories,
  subjects,
}) => {
  const {globalState} = useContext(AppContext);
  const [newContent, setNewContent] = useState(note.content);
  const [newInfo, setNewInfo] = useState({
    name: get(note, 'name', ''),
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

  const handleInfoChange = (key: 'name', value: string) => {
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
            label: 'Atuzalizar',
            buttonMode: 'contained',
            buttonAction: () => {},
          },
          {
            label: 'Fechar',
            buttonMode: 'outlined',
            buttonAction: () => {},
          },
        ]}
        isVisible={true}
        hideDialog={() => {}}
        title={'AA'}>
        <View>
          <TextInput
            label={'Nome da anotação'}
            setText={value => handleInfoChange('name', value)}
            placeholder={'Nome da anotação'}
            value={newInfo.name}
          />
          <Select
            options={translateOptions(categories)}
            onChange={value => {}}
            modalTitle="Selecione uma categoria"
            inputLabel="Selecionar Categoria"
            inputPlaceHolder="Selecionar Categoria"
            defaultValue={''}
          />
          <SelectMultiple
            options={translateOptions(subjects)}
            onChange={value => {}}
            modalTitle="Selecione vários assuntos"
            inputPlaceHolder="Selecionar Assuntos"
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
    };
  }),
)(Show);
