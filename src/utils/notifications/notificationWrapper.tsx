import {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import NavigationService from '../../navigation/NavigationService';

const NotificationWrapper = () => {
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        if (notification.data.title && notification.data.id) {
          NavigationService.navigate('ShowNote', {
            noteName: notification.data.title,
            noteId: notification.data.id,
          });
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

export default NotificationWrapper;
