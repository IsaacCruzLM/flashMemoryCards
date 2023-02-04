export interface TextInputProps {
  label: string;
  setText: () => any;
  placeholder: string;
  value: string;
  style?: object;
  onBlur?: Function | any;
}
