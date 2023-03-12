import {ReactNode} from 'react';
import {FormikHelpers} from 'formik';

export interface FormProps {
  form: ReactNode | React.FC<any> | JSX.Element;
  initialValues: object;
  onSubmit: ((
    values: object,
    formikHelpers: FormikHelpers<object>,
  ) => void | Promise<any>) &
    (Function | Promise<any>);
}

export interface DefaultFormProps {
  handleChange: (field: string) => any;
  handleBlur: (field: string) => any;
  handleSubmit: (field: string) => any;
  setFieldValue: (field: string, value: any) => void;
  resetForm: () => void;
}
