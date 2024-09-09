import React, {useState} from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import DefaultContainerView from '../../components/DefaultContainerView';
import Form from '../../components/Form';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import SelectMultiple from '../../components/SelectMultiple';
import InfoContainer from '../../components/InfoContainer';
import Dialog from '../../components/Dialog';

import ErrorHandlers from '../../utils/errorHandlers';

import {translateOptions} from '../Note/Create';

import {PDFResumeProps, PDFResumeFormProps, formValues} from './types';
import styles from './styles';

const PDFResumePage: React.FunctionComponent<any> = ({
  categories,
  subjects,
}: PDFResumeProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formPDFValues, setFormPDFValues] = useState({});

  const validate = (values: formValues) => {
    const errors = {} as formValues;

    if (!values.pdf_name) {
      errors.pdf_name = 'Campo "Nome do resumo" obrigatório';
    }
    if (!values.categories) {
      errors.categories = 'Selecione pelo menos uma categoria';
    }

    return errors;
  };

  const confirmPDFGeneration = async (values: formValues) => {
    setFormPDFValues(values);
    setShowConfirmDialog(true);
    return values;
  };

  return (
    <DefaultContainerView>
      <Form
        validate={validate}
        form={({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
          errors,
          touched,
        }: PDFResumeFormProps) => (
          <View style={styles.formContainer}>
            <InfoContainer
              message={
                'Preencha o nome do arquivo, selecione as categorias e os assuntos desejados, e gere um PDF das anotações com base nas informações fornecidas.'
              }
            />
            <TextInput
              label={'Nome do resumo'}
              setText={handleChange('pdf_name')}
              onBlur={handleBlur('pdf_name')}
              placeholder={'Nome do resumo'}
              value={values.pdf_name}
              error={ErrorHandlers.showError(
                errors,
                touched,
                'pdf_name' as keyof Object,
              )}
              errorLabel={ErrorHandlers.getErrorLabel(
                errors,
                'pdf_name' as keyof Object,
              )}
            />
            <SelectMultiple
              options={translateOptions(categories)}
              onChange={value => setFieldValue('categories', value)}
              modalTitle="Selecione as categorias do resumo"
              inputPlaceHolder="Selecionar Categorias"
              error={ErrorHandlers.showError(
                errors,
                touched,
                'pdf_name' as keyof Object,
              )}
              errorLabel={ErrorHandlers.getErrorLabel(
                errors,
                'pdf_name' as keyof Object,
              )}
            />
            <SelectMultiple
              options={translateOptions(subjects as any)}
              onChange={value => setFieldValue('subjects', value)}
              modalTitle="Selecione os assuntos do resumo"
              inputPlaceHolder="Selecionar Assuntos"
            />
            <Button
              label="Gerar Resumo"
              modeParam="contained"
              onPress={handleSubmit}
              style={styles.createResumeButton}
            />
          </View>
        )}
        initialValues={{pdf_name: '', categories: [], subjects: []}}
        onSubmit={values => confirmPDFGeneration(values as formValues)}
      />
      <Dialog
        actions={[
          {
            label: 'Cancelar',
            buttonMode: 'outlined',
            buttonAction: () => {
              setShowConfirmDialog(false);
            },
          },
          {
            label: 'Gerar PDF',
            buttonMode: 'contained',
            buttonAction: () => {},
          },
        ]}
        isVisible={showConfirmDialog}
        hideDialog={() => setShowConfirmDialog(false)}
        title={'Você realmente deseja gerar o PDF com essas informações?'}>
        <View />
      </Dialog>
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => {
    return {
      categories: database.get('categories').query(),
      subjects: database.get('subjects').query(),
    };
  }),
)(PDFResumePage);
