export interface TextInputProps {
  label: string;
  setText: Function;
  placeholder: string;
  value: string;
  style?: object;
  onBlur?: Function | any;
}
