export interface TextInputProps {
  label: string;
  setText: (arg0: string) => any;
  placeholder: string;
  value: string;
  style?: object;
  onBlur?: Function | any;
  error?: boolean;
  errorLabel?: string;
}
