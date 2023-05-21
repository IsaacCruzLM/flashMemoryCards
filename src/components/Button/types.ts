export interface ButtonProps {
  modeParam?: 'contained' | 'outlined' | 'text';
  icon?: string;
  label: string;
  onPress?: (arg0?: any) => void | undefined | Promise<void>;
  buttonColorParam?: string;
  textColorParam?: string;
  style?: object;
  disabled?: boolean;
}
