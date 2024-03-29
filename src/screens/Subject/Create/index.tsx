import React from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';
import {of as $of} from 'rxjs';

import NavigationService from '../../../navigation/NavigationService';
import WmdbUtils from '../../../databases/utils';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextInput from '../../../components/TextInput';
import Form from '../../../components/Form';
import ColorPicker from '../../../components/ColorPicker';
import Button from '../../../components/Button';

import styles from './styles';
import {CreateProps, CreateFormProps, formValues} from './types';

const Create: React.FunctionComponent<any> = ({
  route,
  subject,
}: CreateProps) => {
  const isEdit = get(route, 'params.isEdit', false);
  const subjectId = get(route, 'params.subjectId', '');

  const cancelAction = (resetForm: () => void) => {
    resetForm();
    NavigationService.navigate('Subjects');
  };

  const submitAction = async (values: formValues | Object) => {
    isEdit
      ? await WmdbUtils.updateItemInWMDB('subjects', values, subjectId)
      : await WmdbUtils.insertItemInWMDB('subjects', {
          ...values,
          createdAt: new Date(),
        });
    NavigationService.navigate('Subjects');
  };

  return (
    <DefaultContainerView>
      <Form
        form={({
          handleChange,
          handleBlur,
          setFieldValue,
          resetForm,
          handleSubmit,
          values,
        }: CreateFormProps) => (
          <View style={styles.formContainer}>
            <TextInput
              label={'Nome do assunto'}
              setText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder={'Nome do assunto'}
              value={values.name}
            />
            <ColorPicker
              value={values.color}
              iconName={''}
              onChangeColor={color => setFieldValue('color', color)}
            />
            <Button
              label={`${isEdit ? 'Editar' : 'Criar'}  Categoria`}
              onPress={handleSubmit}
              style={styles.createButton}
            />
            <Button
              label="Cancelar"
              modeParam="outlined"
              onPress={() => cancelAction(resetForm)}
            />
          </View>
        )}
        initialValues={
          isEdit
            ? {name: subject.name, color: subject.color}
            : {name: '', color: ''}
        }
        onSubmit={values => submitAction(values)}
      />
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database, route}: any) => {
    const isEdit = get(route, 'params.isEdit', false);
    const subjectId = get(route, 'params.subjectId', '');

    return {
      subject: isEdit
        ? database.get('subjects').findAndObserve(subjectId)
        : $of(null),
    };
  }),
)(Create);
