export interface ButtonProps {
  modeParam?: 'contained' | 'outlined' | 'text';
  icon?: string;
  label: string;
  onPress?: () => void | undefined;
  buttonColorParam?: string;
  textColorParam?: string;
  style?: object;
}
