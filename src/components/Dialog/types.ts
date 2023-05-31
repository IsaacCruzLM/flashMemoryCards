export interface DialogProps {
  isVisible: boolean;
  hideDialog: () => void;
  title: string;
  children?: JSX.Element | any;
  actions: Array<ActionType>;
  [x: string]: any;
}

export type ActionType = {
  label: string;
  buttonMode: 'contained' | 'outlined' | 'text';
  buttonAction: () => void;
};
