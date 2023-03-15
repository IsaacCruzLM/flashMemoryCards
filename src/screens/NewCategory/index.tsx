import React from 'react';
import {View} from 'react-native';

import NavigationService from '../../navigation/NavigationService';
import insertItenInWMDB from '../../databases/utils/insertItenInWMDB';

import DefaultContainerView from '../../components/DefaultContainerView';
import TextInput from '../../components/TextInput';
import Form from '../../components/Form';
import SelectIcon from '../../components/SelectIcon';
import ColorPicker from '../../components/ColorPicker';
import Button from '../../components/Button';

import styles from './styles';
import {NewCategoryFormProps, formValues} from './types';

const NewCategory = () => {
  const cancelAction = (resetForm: () => void) => {
    resetForm();
    NavigationService.navigate('Categories');
  };

  const createAction = async (values: formValues | Object) => {
    await insertItenInWMDB('Subjects', values);
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
        }: NewCategoryFormProps) => (
          <View style={styles.formContainer}>
            <TextInput
              label={'Nome da categoria'}
              setText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              placeholder={'Nome da categoria'}
              value={values.nome}
            />
            <SelectIcon
              onPress={iconLabel => setFieldValue('icon', iconLabel)}
            />
            <ColorPicker
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
        initialValues={{nome: '', icon: '', color: ''}}
        onSubmit={values => createAction(values)}
      />
    </DefaultContainerView>
  );
};

export default NewCategory;
