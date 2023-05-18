export interface ButtonProps {
  modeParam?: 'contained' | 'outlined' | 'contained-tonal';
  iconName: string;
  iconSize?: number;
  onPress: (arg0?: any) => void | undefined;
  iconColorParam?: string;
  backgroundColor?: string;
  style?: object;
  disabled?: boolean;
}
