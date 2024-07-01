import React from 'react';
import {Formik} from 'formik';

import {FormProps} from './types';

const Form = ({form, initialValues, onSubmit, validate}: FormProps) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
    {form}
  </Formik>
);

export default Form;
