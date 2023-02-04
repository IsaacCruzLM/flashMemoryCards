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
