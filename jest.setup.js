/* eslint-disable no-undef */
// jest.setup.js
import {NativeModules} from 'react-native';

// Mock do NativeModules para WatermelonDB
NativeModules.DatabaseBridge = {
  initialize: jest.fn(),
};

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: props => <div {...props} />,
  SafeAreaProvider: props => <div {...props} />,
}));

jest.mock('@gorhom/bottom-sheet', () => ({
  BottomSheet: props => <div {...props} />,
}));

jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  const Text = require('react-native').Text;

  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: View,
    Text: Text,
    Extrapolate: {CLAMP: jest.fn()},
    withRepeat: jest.fn(),
    withTiming: jest.fn(),
    withDelay: jest.fn((delay, animation) => {
      return animation;
    }),
    runOnUI: fn => fn(),
    useSharedValue: jest.fn().mockReturnValue({value: 0}),
    useAnimatedStyle: jest.fn(style => style),
    Transition: {
      Together: 'Together',
      Out: 'Out',
      In: 'In',
    },
  };
});

jest.mock('react-native-webview', () => {
  return {
    WebView: props => <div {...props} />,
  };
});

jest.mock('@nozbe/watermelondb', () => {
  const mockDatabase = {
    action: jest.fn(action => action()),
    get: jest.fn(() => ({
      find: jest.fn(),
      query: jest.fn().mockReturnThis(),
      fetch: jest.fn(),
      create: jest.fn(),
    })),
  };

  const mockCollection = {
    find: jest.fn(),
    query: jest.fn().mockReturnThis(),
    fetch: jest.fn(),
    create: jest.fn(),
    prepareCreate: jest.fn(() => ({})),
  };

  return {
    Database: jest.fn(() => mockDatabase),
    Collection: jest.fn(() => mockCollection),
    Model: jest.fn(),
    field: jest.fn(),
    date: jest.fn(),
    readonly: jest.fn(),
    text: jest.fn(),
    relation: jest.fn(),
    tableSchema: jest.fn(() => ({})),
    appSchema: jest.fn(() => ({})),
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock do Animated.View para evitar erros de renderização durante os testes
jest.mock('react-native/Libraries/Animated/Animated', () => {
  const ActualAnimated = jest.requireActual(
    'react-native/Libraries/Animated/Animated',
  );
  return {
    ...ActualAnimated,
    View: jest.fn(props => props.children),
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  return {
    __esModule: true,
    default: 'Icon',
  };
});
