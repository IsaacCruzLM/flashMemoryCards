import React, {useEffect, useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import DefaultContainerView from '../../../components/DefaultContainerView';
import Form from '../../../components/Form';
import Select from '../../../components/Select';
import TextEditor from '../../../components/TextEditor';
import SelectMultiple from '../../../components/SelectMultiple';
import Button from '../../../components/Button';

import styles from './styles';
import {CreateFormProps} from './types';

const Create: React.FunctionComponent<any> = ({categories}) => {
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

  return (
    <DefaultContainerView>
      <Form
        form={({setFieldValue}: CreateFormProps) => (
          <View style={styles.formContainer}>
            <View>
              {step === 1 ? (
                <>
                  <Select
                    options={translateOptions(categories)}
                    onChange={value => setFieldValue('category', value)}
                    modalTitle="Selecione uma categoria"
                    inputLabel="Selecionar Categoria"
                    inputPlaceHolder="Selecionar Categoria"
                  />
                  <SelectMultiple
                    options={translateOptions(categories)}
                    onChange={values => setFieldValue('subjects', values)}
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
            {step === 2 && keyboardStatus === 'Keyboard Shown' ? null : (
              <View>
                <Button
                  label={step === 2 ? 'Criar Anotação' : 'Proximo'}
                  onPress={() => setStep(step === 1 ? 2 : 1)}
                />
                <Text style={styles.stepIndicator}>{`${step} / 2`}</Text>
              </View>
            )}
          </View>
        )}
        initialValues={{category: '', subjects: [], content: ''}}
        onSubmit={() => {}}
      />
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => {
    return {
      categories: database.get('categories').query(),
    };
  }),
)(Create);
