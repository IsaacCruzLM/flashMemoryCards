import React from 'react';
import {Formik} from 'formik';

import {FormProps} from './types';

const Form = ({form, initialValues, onSubmit}: FormProps) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit}>
    {form}
  </Formik>
);

export default Form;
