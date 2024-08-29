import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import DefaultContainerView from '../../../components/DefaultContainerView';
import Form from '../../../components/Form';
import Select from '../../../components/Select';
import TextEditor from '../../../components/TextEditor';
import SelectMultiple from '../../../components/SelectMultiple';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';

import WmdbUtils from '../../../databases/utils';
import {CategoryModelType} from '../../../databases/models/categoryModel';
import NavigationService from '../../../navigation/NavigationService';
import ErrorHandlers from '../../../utils/errorHandlers';
import toastShow from '../../../utils/toastShow';
import notifyNotes from '../../../utils/notifications/notifyNotes';

import styles from './styles';
import {CreateFormProps, CreateProps, formValues, optionsType} from './types';
import {NoteModel} from '../../../databases/models/noteModel';

export const translateOptions = (optionsArray: optionsType[]) =>
  optionsArray.map(({id, name, icon, color}: optionsType) => ({
    label: name,
    value: id,
    iconName: icon,
    iconColor: color,
  }));

const Create: React.FunctionComponent<CreateProps | any> = ({
  categories,
  subjects,
  route,
}) => {
  const [step, setStep] = useState(1);
  const [keyboardStatus, setKeyboardStatus] = useState('');

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

  const submitAction = async (values: formValues) => {
    const newDataObject = cloneDeep(values);
    const M2MRelationships = get(newDataObject, 'subjects', []).map(id => ({
      type: 'subject',
      id,
    }));
    const categoryRelationshipId = get(newDataObject, 'category', '');
    delete newDataObject.subjects;
    delete newDataObject.category;

    const today = new Date();

    const note = (await WmdbUtils.insertItemWithM2MRelationInWMDB(
      'notes',
      {
        ...newDataObject,
        levelRevision: 1,
        createdAt: new Date(),
        lastRevision: new Date(),
        nextRevision: today.setDate(today.getDate() + 1),
        relationships: [
          {
            type: 'category',
            id: categoryRelationshipId,
          },
        ],
      },
      'note_subjects',
      M2MRelationships,
      'note',
    )) as NoteModel;

    toastShow('success', 'Anotação criada com sucesso');

    notifyNotes({name: note.name, id: note.id});

    if (get(route, 'params.categoryId', '')) {
      NavigationService.navigate('Notes', {
        categoryName: get(
          categories.find(
            (category: CategoryModelType) =>
              category.id === get(route, 'params.categoryId', ''),
          ),
          'name',
          '',
        ),
        categoryId: get(route, 'params.categoryId', ''),
      });
    } else {
      NavigationService.navigate('Home');
    }
  };

  const validate = (values: formValues) => {
    const errors = {} as formValues;

    if (!values.name) {
      errors.name = 'Campo "Nome da anotação" obrigatório';
    }
    if (!values.category) {
      errors.category = 'Selecione uma categoria';
    }

    return errors;
  };

  const earlyValidate = (values: formValues) => {
    const validationCheck = validate(values);

    return Object.keys(validationCheck).length === 0;
  };

  return (
    <DefaultContainerView>
      <Form
        validate={validate}
        form={({
          setFieldValue,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }: CreateFormProps) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formContainer}>
            <View>
              {step === 1 ? (
                <>
                  <TextInput
                    label={'Nome da anotação'}
                    setText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    placeholder={'Nome da anotação'}
                    value={values.name}
                    error={ErrorHandlers.showError(
                      errors,
                      touched,
                      'name' as keyof Object,
                    )}
                    errorLabel={ErrorHandlers.getErrorLabel(
                      errors,
                      'name' as keyof Object,
                    )}
                  />
                  <Select
                    options={translateOptions(categories)}
                    onChange={value => setFieldValue('category', value)}
                    modalTitle="Selecione uma categoria"
                    inputLabel="Selecionar Categoria"
                    inputPlaceHolder="Selecionar Categoria"
                    defaultValue={values.category}
                    error={ErrorHandlers.showError(
                      errors,
                      touched,
                      'category' as keyof Object,
                    )}
                    errorLabel={ErrorHandlers.getErrorLabel(
                      errors,
                      'category' as keyof Object,
                    )}
                  />
                  <SelectMultiple
                    options={translateOptions(subjects)}
                    onChange={value => setFieldValue('subjects', value)}
                    modalTitle="Selecione vários assuntos"
                    inputPlaceHolder="Selecionar Assuntos"
                  />
                </>
              ) : null}
              {step === 2 ? (
                <TextEditor
                  onChange={content => setFieldValue('content', content)}
                  placeHolder="Escreva sua anotação aqui!"
                />
              ) : null}
            </View>
            {keyboardStatus === 'Keyboard Shown' ? null : (
              <View>
                <Button
                  label={step === 2 ? 'Criar Anotação' : 'Proximo'}
                  onPress={
                    step === 2
                      ? handleSubmit
                      : () =>
                          earlyValidate(values)
                            ? setStep(step + 1)
                            : handleSubmit()
                  }
                />
                <Text style={styles.stepIndicator}>{`${step} / 2`}</Text>
              </View>
            )}
          </KeyboardAvoidingView>
        )}
        initialValues={{
          name: '',
          category: get(route, 'params.categoryId', ''),
          subjects: [],
          content: '',
        }}
        onSubmit={values => submitAction(values as formValues)}
      />
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => {
    return {
      categories: database.get('categories').query(),
      subjects: database.get('subjects').query(),
    };
  }),
)(Create);
