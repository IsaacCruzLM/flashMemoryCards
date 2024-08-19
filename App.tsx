/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {Provider as PaperProvider, useTheme} from 'react-native-paper';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {database} from './src/databases';
import theme from './src/styles/themes';
import Routes from './src/navigation/routes';
import ContextProvider from './src/context/appProvider';
import PushNotification from 'react-native-push-notification';

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

PushNotification.createChannel(
  {
    channelId: 'note-notification-id',
    channelName: 'Notificações de revisão',
    playSound: true,
    soundName: 'default',
    vibrate: true,
  },
  created => console.log(`createChannel returned '${created}'`),
);

const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <ContextProvider>
        <PaperProvider theme={theme}>
          <AlertNotificationRoot>
            <DatabaseProvider database={database}>
              <BottomSheetModalProvider>
                <Routes />
              </BottomSheetModalProvider>
            </DatabaseProvider>
          </AlertNotificationRoot>
        </PaperProvider>
      </ContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
