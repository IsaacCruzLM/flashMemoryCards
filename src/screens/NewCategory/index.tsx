import React from 'react';
import {View} from 'react-native';

import DefaultContainerView from '../../components/DefaultContainerView';
import TextInput from '../../components/TextInput';
import Form from '../../components/Form';

import styles from './styles';
import {NewCategoryFormProps} from './types';
import SelectIcon from '../../components/SelectIcon';
import ColorPicker from '../../components/ColorPicker';
import Button from '../../components/Button';

const NewCategory = () => {
  return (
    <DefaultContainerView>
      <Form
        form={({
          handleChange,
          handleBlur,
          setFieldValue,
          // handleSubmit,
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
            <Button label="Logar" onPress={() => console.log(values)} />
          </View>
        )}
        initialValues={{nome: '', icon: '', color: ''}}
        onSubmit={values => console.log(values)}
      />
    </DefaultContainerView>
  );
};

export default NewCategory;
