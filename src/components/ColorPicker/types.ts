export interface ColorPickerProps {
  value: string;
  iconName: string;
  onChangeColor: (arg0: string) => any;
  error?: boolean;
  errorLabel?: string;
}
