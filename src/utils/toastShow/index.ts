import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const toastShow = (
  type: 'danger' | 'success' | 'warning',
  title: string,
  textBody: string,
) => {
  const getType = () => {
    switch (type) {
      case 'danger':
        return ALERT_TYPE.DANGER;
      case 'success':
        return ALERT_TYPE.SUCCESS;
      case 'warning':
      default:
        return ALERT_TYPE.WARNING;
    }
  };

  Toast.show({
    type: getType(),
    title: title,
    textBody: textBody,
  });
};

export default toastShow;
