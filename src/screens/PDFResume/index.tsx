import React, {useState} from 'react';
import {View} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {Q} from '@nozbe/watermelondb';
import {compose} from 'recompose';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  ALERT_TYPE,
  Toast,
  Dialog as DialogAlert,
} from 'react-native-alert-notification';
import get from 'lodash/get';
import find from 'lodash/find';
import filter from 'lodash/filter';

import DefaultContainerView from '../../components/DefaultContainerView';
import Form from '../../components/Form';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import SelectMultiple from '../../components/SelectMultiple';
import InfoContainer from '../../components/InfoContainer';
import Dialog from '../../components/Dialog';

import ErrorHandlers from '../../utils/errorHandlers';
import WmdbUtils from '../../databases/utils';

import {translateOptions} from '../Note/Create';
import {NoteModelType} from '../../databases/models/noteModel';
import {CategoryModelType} from '../../databases/models/categoryModel';
import {SubjectModelType} from '../../databases/models/subjectModel';
import {NoteSubjectModelType} from '../../databases/models/noteSubjectModel';

import {PDFResumeProps, PDFResumeFormProps, formValues} from './types';
import styles from './styles';

const generatePDF = async (
  notesToExport: NoteModelType[],
  pdfName: string,
  categories: CategoryModelType[],
  subjects: SubjectModelType[],
  noteSubjects: NoteSubjectModelType[],
) => {
  if (notesToExport.length === 0) {
    return Toast.show({
      type: ALERT_TYPE.WARNING,
      title: 'Nenhuma anotação encontrada!',
      textBody:
        'O Resumo em PDF não foi gerado pois não foram encontradas nenhuma anotação com as caracteristicas inseridas.',
    });
  }

  const generateNoteContent = (note: NoteModelType) => {
    const categoryName = get(
      find(
        categories,
        item => get(item, '_raw.id') === get(note, '_raw.category_id'),
      ),
      'name',
      'Não encontrado',
    );

    const subjectsNames = filter(
      noteSubjects,
      noteSubject => get(noteSubject, '_raw.note_id') === get(note, '_raw.id'),
    ).map(noteSubject =>
      get(
        find(
          subjects,
          subject =>
            get(noteSubject, '_raw.subject_id') === get(subject, '_raw.id'),
        ),
        'name',
        'Não Encontrado',
      ),
    );

    return `
    <div class="container" style="border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <div class="header" style="background-color: #22272E; padding: 10px; border-radius: 6px; margin-bottom: 5px;">
        <h1 style="font-size: 24px; margin: 0; color: #FFFFFF;"><strong>${
          note.name
        }</strong></h1>
        <p style="font-size: 14px; margin: 5px 0; color: #FFFFFF";"><strong>Data de Criação:</strong>${new Date(
          note.createdAt,
        ).toLocaleDateString('pt-BR')}</p>
        <p style="font-size: 14px; margin: 5px 0; color: #FFFFFF";"><strong>Categoria:</strong>${categoryName}</p>
        <p style="font-size: 14px; margin: 5px 0; color: #FFFFFF";"><strong>Assuntos:</strong>${subjectsNames.join(
          ', ',
        )}</p>
      </div>
      <div style="border: 1px solid black; min-height: 300px; border-radius: 6px; padding: 10px;"><p>${
        note.content
      }</p></div>
    </div>
  `;
  };

  const htmlContent = `
    <div class="html-container" style="padding: 20px;">
     ${notesToExport
       .map((note: NoteModelType) => generateNoteContent(note))
       .join('')}
    </div>
  `;

  let options = {
    html: htmlContent,
    fileName: pdfName,
    directory: 'Documents',
  };

  let file = await RNHTMLtoPDF.convert(options);

  DialogAlert.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Resumo em PDF gerado com sucesso',
    textBody: `O PDF foi armazenado no seguinte local: ${file.filePath}`,
    button: 'Abrir PDF',
    onPressButton: () => {
      console.log('Here');
    },
  });
};

const PDFResumePage: React.FunctionComponent<any> = ({
  categories,
  subjects,
  noteSubjects,
}: PDFResumeProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formPDFValues, setFormPDFValues] = useState({} as formValues);
  const [loadingPDFGenerate, setLoadingPDFGenerate] = useState(false);

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
            buttonAction: async () => {
              setLoadingPDFGenerate(true);
              let notesWithTheSubjects = [];
              if (formPDFValues.subjects.length > 0) {
                notesWithTheSubjects = (
                  await WmdbUtils.getDataFromWMDB(
                    'note_subjects',
                    Q.where('subject_id', Q.oneOf(formPDFValues.subjects)),
                  )
                ).map(
                  (noteSubject: NoteSubjectModelType) =>
                    noteSubject._raw.note_id,
                );
              }

              const notesToExport = await WmdbUtils.getDataFromWMDB(
                'notes',
                Q.and(
                  Q.where(
                    'category_id',
                    Q.oneOf(formPDFValues.categories as Array<any>),
                  ),
                  ...(notesWithTheSubjects.length > 0
                    ? [Q.where('id', Q.oneOf(notesWithTheSubjects))]
                    : []),
                ),
              );

              generatePDF(
                notesToExport,
                formPDFValues.pdf_name,
                categories,
                subjects,
                noteSubjects,
              ).then(() => {
                setShowConfirmDialog(false);
                setLoadingPDFGenerate(false);
              });
            },
            loading: loadingPDFGenerate,
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
      noteSubjects: database.get('note_subjects').query(),
    };
  }),
)(PDFResumePage);
