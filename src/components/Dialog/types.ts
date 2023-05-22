export interface DialogProps {
  isVisible: boolean;
  hideDialog: () => void;
  title: string;
  children?: JSX.Element | any;
  [x: string]: any;
}
