import React from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';
import {of as $of} from 'rxjs';

import NavigationService from '../../../navigation/NavigationService';
import WmdbUtils from '../../../databases/utils';
import ErrorHandlers from '../../../utils/errorHandlers';

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
  const categoryId = get(route, 'params.categoryId', '');

  const cancelAction = (resetForm: () => void) => {
    resetForm();
    NavigationService.navigate('Categories');
  };

  const submitAction = async (values: formValues | Object) => {
    isEdit
      ? await WmdbUtils.updateItemInWMDB('categories', values, categoryId)
      : await WmdbUtils.insertItemInWMDB('categories', {
          ...values,
          createdAt: new Date(),
        });
    NavigationService.navigate('Categories');
  };

  const validate = (values: formValues) => {
    const errors = {} as formValues;

    if (!values.name) {
      errors.name = 'Campo "Nome da categoria" obrigatório';
    }
    if (!values.icon) {
      errors.icon = 'Campo de "Ícone" obrigatório';
    }
    if (!values.color) {
      errors.color = 'Campo "Cor" obrigatório';
    }

    return errors;
  };

  return (
    <DefaultContainerView>
      <Form
        validate={validate}
        form={({
          handleChange,
          handleBlur,
          setFieldValue,
          resetForm,
          handleSubmit,
          values,
          errors,
          touched,
        }: CreateFormProps) => (
          <View style={styles.formContainer}>
            <TextInput
              label={'Nome da categoria'}
              setText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder={'Nome da categoria'}
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
            <SelectIcon
              value={values.icon}
              onPress={iconLabel => setFieldValue('icon', iconLabel)}
              error={ErrorHandlers.showError(
                errors,
                touched,
                'icon' as keyof Object,
              )}
              errorLabel={ErrorHandlers.getErrorLabel(
                errors,
                'icon' as keyof Object,
              )}
            />
            <ColorPicker
              value={values.color}
              iconName={values.icon}
              onChangeColor={color => setFieldValue('color', color)}
              error={ErrorHandlers.showError(
                errors,
                touched,
                'color' as keyof Object,
              )}
              errorLabel={ErrorHandlers.getErrorLabel(
                errors,
                'color' as keyof Object,
              )}
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
            ? {name: category.name, icon: category.icon, color: category.color}
            : {name: '', icon: '', color: ''}
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
    const categoryId = get(route, 'params.categoryId', '');

    return {
      category: isEdit
        ? database.get('categories').findAndObserve(categoryId)
        : $of(null),
    };
  }),
)(Create);
