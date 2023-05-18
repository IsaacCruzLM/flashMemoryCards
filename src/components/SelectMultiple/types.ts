export interface SelectMultipleProps {
  options: optionType[];
  onChange: (arg: string[]) => void;
  defaultValue?: string[];
  modalTitle: string;
  inputPlaceHolder: string;
}

export interface optionType {
  label: string;
  value: string;
  iconColor?: string;
}

export interface ChipProps {
  text: string;
}
