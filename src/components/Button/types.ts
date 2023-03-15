export interface ButtonProps {
  modeParam?: 'contained' | 'outlined' | 'text';
  icon?: string;
  label: string;
  onPress?: (arg0?: any) => void | undefined;
  buttonColorParam?: string;
  textColorParam?: string;
  style?: object;
  disabled?: boolean;
}
