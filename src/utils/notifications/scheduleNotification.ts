import PushNotification from 'react-native-push-notification';

const scheduleLocalNotification = (
  channelId: string,
  title: string,
  message: string,
  date: Date,
  userInfo: Object = {},
): void =>
  PushNotification.localNotificationSchedule({
    channelId: channelId,
    title: title,
    message: message,
    userInfo: userInfo,
    date: date,
    allowWhileIdle: false,
    repeatTime: 1,
  });

export default scheduleLocalNotification;
