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

import {database} from './src/databases';
import theme from './src/styles/themes';
import Routes from './src/navigation/routes';

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <DatabaseProvider database={database}>
        <Routes />
      </DatabaseProvider>
    </PaperProvider>
  );
};

export default App;
