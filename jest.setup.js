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

jest.mock('@nozbe/watermelondb/DatabaseProvider', () => ({
  withDatabase: jest.fn(Component => props => {
    const mockDatabase = {
      get: jest.fn(() => ({
        query: jest.fn(() => ({
          observe: jest.fn(() => ({
            subscribe: jest.fn(callback => {
              callback([]); // Retorna uma lista vazia ou dados mockados
              return {unsubscribe: jest.fn()}; // Simula a funcionalidade de subscribe
            }),
          })),
          observeWithColumns: jest.fn(() => ({
            subscribe: jest.fn(callback => {
              callback([]); // Retorna uma lista vazia ou dados mockados
              return {unsubscribe: jest.fn()}; // Simula a funcionalidade de subscribe
            }),
          })),
        })),
      })),
    };

    return <Component {...props} database={mockDatabase} />;
  }),
}));

jest.mock('@nozbe/watermelondb/hooks', () => ({
  withObservables: jest.fn((_, getObservables) => Component => props => {
    const observables = getObservables(props);
    const mockData = Object.keys(observables).reduce((acc, key) => {
      acc[key] = {
        subscribe: jest.fn(callback => {
          callback([]); // Dados mockados
          return {unsubscribe: jest.fn()}; // Simula o unsubscribe
        }),
      };
      return acc;
    }, {});

    return <Component {...props} {...mockData} />;
  }),
}));

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

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    GestureHandlerRootView: View,
    RectButton: View,
    BaseButton: View,
    Gesture: {
      Tap: () => ({
        enabled: jest.fn(),
        onStart: jest.fn(),
        onEnd: jest.fn(),
      }),
    },
    GestureDetector: View,
    PanGestureHandler: View,
    State: {},
    Directions: {},
  };
});

jest.mock('react-native-pell-rich-editor', () => {
  const View = require('react-native').View;

  class MockRichEditor extends require('react').Component {
    // Mock editor methods
    setContentHTML = jest.fn();
    getContentHtml = jest.fn().mockResolvedValue('<p>Mock content</p>');
    insertImage = jest.fn();
    insertLink = jest.fn();

    render() {
      return <View {...this.props} />;
    }
  }

  class MockRichToolbar extends require('react').Component {
    render() {
      return <View {...this.props} />;
    }
  }

  return {
    RichEditor: MockRichEditor,
    RichToolbar: MockRichToolbar,
    actions: {
      insertImage: 'insertImage',
      setBold: 'setBold',
      setItalic: 'setItalic',
      insertBulletsList: 'insertBulletsList',
      insertOrderedList: 'insertOrderedList',
      insertLink: 'insertLink',
      keyboard: 'keyboard',
      setStrikethrough: 'setStrikethrough',
      setUnderline: 'setUnderline',
      removeFormat: 'removeFormat',
      alignLeft: 'alignLeft',
      alignCenter: 'alignCenter',
      alignRight: 'alignRight',
      alignFull: 'alignFull',
      insertVideo: 'insertVideo',
      checkboxList: 'checkboxList',
      undo: 'undo',
      redo: 'redo',
    },
  };
});

jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  localNotification: jest.fn(),
  cancelAllLocalNotifications: jest.fn(),
  cancelLocalNotifications: jest.fn(),
  getScheduledLocalNotifications: jest.fn(callback => callback([])),
  requestPermissions: jest.fn(() => Promise.resolve(true)),
  checkPermissions: jest.fn(callback =>
    callback({alert: true, badge: true, sound: true}),
  ),
  createChannel: jest.fn((channelId, channelName) => Promise.resolve()),
  deleteChannel: jest.fn(() => Promise.resolve()),
}));
