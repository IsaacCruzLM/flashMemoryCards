import React, {useEffect, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
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

import styles from './styles';
import {CreateFormProps, CreateProps, formValues} from './types';

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

  const translateOptions = (optionsArray: any) =>
    optionsArray.map(({id, name, icon, color}: any) => ({
      label: name,
      value: id,
      iconName: icon,
      iconColor: color,
    }));

  const submitAction = async (values: formValues | Object) => {
    const newDataObject = cloneDeep(values);
    const relationships = get(newDataObject, 'subjects', []).forEach(id => ({
      subject: id,
    }));
    delete newDataObject.subjects;

    console.log("Flag", newDataObject, relationships);
  };

  return (
    <DefaultContainerView>
      <Form
        form={({
          setFieldValue,
          handleSubmit,
          handleChange,
          handleBlur,
          values,
        }: CreateFormProps) => (
          <View style={styles.formContainer}>
            <View>
              {step === 1 ? (
                <>
                  <TextInput
                    label={'Nome da anotação'}
                    setText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    placeholder={'Nome da anotação'}
                    value={values.name}
                  />
                  <Select
                    options={translateOptions(categories)}
                    onChange={value => setFieldValue('category', value)}
                    modalTitle="Selecione uma categoria"
                    inputLabel="Selecionar Categoria"
                    inputPlaceHolder="Selecionar Categoria"
                    defaultValue={values.category}
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
                  onPress={step === 2 ? handleSubmit : () => setStep(step + 1)}
                />
                <Text style={styles.stepIndicator}>{`${step} / 2`}</Text>
              </View>
            )}
          </View>
        )}
        initialValues={{
          name: '',
          category: get(route, 'params.categoryId', ''),
          subjects: [],
          content: '',
        }}
        onSubmit={values => submitAction(values)}
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
