import React, {useState} from 'react';
import {Button, View} from 'react-native';

import DefaultContainerView from '../../components/DefaultContainerView';
import TextInput from '../../components/TextInput';
import {MyReactNativeForm} from '../../components/Form';

// import styles from './styles';

const NewCategory = () => {
  const [name, setName] = useState('');
  return (
    <DefaultContainerView>
      <MyReactNativeForm
        form={({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{width: '100%'}}>
            <TextInput
              label={'Nome da categoria'}
              setText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder={'Nome da categoria'}
              value={values.email}
            />
            <TextInput
              label={'Nome da categoria'}
              setText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              placeholder={'Nome da categoria'}
              value={values.email}
            />
          </View>
        )}
      />
    </DefaultContainerView>
  );
};

export default NewCategory;
