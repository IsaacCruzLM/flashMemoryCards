export interface SelectProps {
  options: optionType[];
  onChange: (arg: string) => void;
  defaultValue?: string;
  modalTitle: string;
  inputLabel: string;
  inputPlaceHolder: string;
  error?: boolean;
  errorLabel?: string;
}

export interface optionType {
  label: string;
  value: string;
  iconName?: string;
  iconColor?: string;
}
