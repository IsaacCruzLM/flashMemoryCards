export interface NewCategoryFormProps {
  handleChange: (field: string) => any;
  handleBlur: (field: string) => any;
  handleSubmit: (field: string) => any;
  setFieldValue: (field: string, value: any) => void;
  values: formValues;
}

interface formValues {
  nome: string;
  icon: string;
  color: string;
}
