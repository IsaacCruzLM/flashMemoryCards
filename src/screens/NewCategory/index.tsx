import React, {useState} from 'react';
import {View} from 'react-native';

import DefaultContainerView from '../../components/DefaultContainerView';
import TextInput from '../../components/TextInput';
import Form from '../../components/Form';

import styles from './styles';
import {NewCategoryFormProps} from './types';
import SelectIcon from '../../components/SelectIcon';

const NewCategory = () => {
  const [icon, setIcon] = useState('');
  console.log(icon);

  return (
    <DefaultContainerView>
      <Form
        form={({
          handleChange,
          handleBlur,
          // handleSubmit,
          values,
        }: NewCategoryFormProps) => (
          <View style={styles.formContainer}>
            <TextInput
              label={'Email'}
              setText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder={'Email'}
              value={values.email}
            />
            <TextInput
              label={'Nome da categoria'}
              setText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              placeholder={'Nome da categoria'}
              value={values.nome}
            />
            <SelectIcon onPress={iconLabel => setIcon(iconLabel)} />
          </View>
        )}
        initialValues={{nome: '', email: ''}}
        onSubmit={values => console.log(values)}
      />
    </DefaultContainerView>
  );
};

export default NewCategory;
