import React from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import DefaultContainerView from '../../../components/DefaultContainerView';
import Form from '../../../components/Form';
import Select from '../../../components/Select';

import styles from './styles';
import {CreateFormProps} from './types';
import SelectMultiple from '../../../components/SelectMultiple';

const Create: React.FunctionComponent<any> = ({categories}) => {
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
            <Select
              options={translateOptions(categories)}
              onChange={value => setFieldValue('category', value)}
              modalTitle="Selecione uma categoria"
            />
            <SelectMultiple
              options={translateOptions(categories)}
              onChange={values => setFieldValue('subjects', values)}
              modalTitle="Selecione vários assuntos"
            />
          </View>
        )}
        initialValues={{category: '', subjects: []}}
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
