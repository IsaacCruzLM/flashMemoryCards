import React from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';
import {of as $of} from 'rxjs';

import NavigationService from '../../../navigation/NavigationService';
import insertItenInWMDB from '../../../databases/utils/insertItenInWMDB';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextInput from '../../../components/TextInput';
import Form from '../../../components/Form';
import SelectIcon from '../../../components/SelectIcon';
import ColorPicker from '../../../components/ColorPicker';
import Button from '../../../components/Button';

import styles from './styles';
import {CreateProps, CreateFormProps, formValues} from './types';

const Create: React.FunctionComponent<any> = ({
  route,
  category,
}: CreateProps) => {
  const isEdit = get(route, 'params.isEdit', false);

  const cancelAction = (resetForm: () => void) => {
    resetForm();
    NavigationService.navigate('Categories');
  };

  const createAction = async (values: formValues | Object) => {
    await insertItenInWMDB('categories', {...values, createdAt: new Date()});
    NavigationService.navigate('Categories');
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
              label={'Nome da categoria'}
              setText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder={'Nome da categoria'}
              value={values.name}
            />
            <SelectIcon
              value={values.icon}
              onPress={iconLabel => setFieldValue('icon', iconLabel)}
            />
            <ColorPicker
              value={values.color}
              iconName={values.icon}
              onChangeColor={color => setFieldValue('color', color)}
            />
            <Button
              label="Criar Categoria"
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
            ? {name: category.name, icon: category.icon, color: category.color}
            : {name: '', icon: '', color: ''}
        }
        onSubmit={values => createAction(values)}
      />
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database, route}: any) => {
    const isEdit = get(route, 'params.isEdit', false);
    const categoryId = get(route, 'params.categoryId', '');

    return {
      category: isEdit
        ? database.get('categories').findAndObserve(categoryId)
        : $of(null),
    };
  }),
)(Create);
