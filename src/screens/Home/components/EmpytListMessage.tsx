import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PushNotification from 'react-native-push-notification';

import themes from '../../../styles/themes';

import styles from './styles';

import Button from '../../../components/Button';

const EmpytListMessage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon
          color={themes.colors.primary}
          size={themes.spacing.unit * 10}
          name={'file-document-edit-outline'}
        />
      </View>
      <Text style={styles.title}>Nenhuma anotação a ser revisada</Text>
      <Text style={styles.subtitle}>
        Insira novas anotações ou revise as anotações acessando-as pela seção de
        categorias
      </Text>
      <Button
        label={'Notificação'}
        onPress={() => {
          PushNotification.localNotificationSchedule({
            channelId: 'note-notification-id',
            userInfo: {foo: 'bar'},
            //... You can use all the options from localNotifications
            message: 'My Notification Message', // (required)
            date: new Date(Date.now() + 60 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
          });
        }}
      />
    </View>
  );
};

export default EmpytListMessage;
