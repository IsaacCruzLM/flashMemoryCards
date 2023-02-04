export interface NewCategoryFormProps {
  handleChange: (field: string) => any;
  handleBlur: (field: string) => any;
  handleSubmit: (field: string) => any;
  values: formValues;
}

interface formValues {
  nome: string;
  email: string;
}
