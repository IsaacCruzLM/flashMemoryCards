import React from 'react';
import {View} from 'react-native';

import DefaultContainerView from '../../../components/DefaultContainerView';
import Form from '../../../components/Form';

import styles from './styles';
import {CreateFormProps} from './types';

const Create: React.FunctionComponent<any> = () => {
  return (
    <DefaultContainerView>
      <Form
        form={({}: CreateFormProps) => <View style={styles.formContainer} />}
        initialValues={{category: '', subjects: []}}
        onSubmit={() => {}}
      />
    </DefaultContainerView>
  );
};

export default Create;
