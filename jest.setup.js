/* eslint-disable react/react-in-jsx-scope */
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
      findAndObserve: jest.fn(),
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
    Q: {
      where: jest.fn(),
      or: jest.fn(),
      and: jest.fn(),
      on: jest.fn(),
      unique: jest.fn(),
    },
  };
});

jest.mock('@nozbe/watermelondb/DatabaseProvider', () => {
  const mockedData = {
    notes: [
      {
        id: 'note_1',
        name: 'Introduction to React',
        content:
          'Learn the basics of React, including components, hooks, and state.',
        levelRevision: 1,
        createdAt: new Date('2024-01-01').getTime(),
        lastRevision: new Date('2024-01-05').getTime(),
        nextRevision: new Date('2024-01-12').getTime(),
        category: {
          fetch: () => ({
            name: 'Categoria 1',
          }),
        },
        subjects: {
          fetch: () => [
            {name: 'Assunto 1', color: '#ffffff'},
            {name: 'Assunto 2', color: '#d11cd5'},
          ],
        },
      },
      {
        id: 'note_2',
        name: 'Advanced TypeScript',
        content:
          'Explore advanced TypeScript features like generics, decorators, and utility types.',
        levelRevision: 2,
        createdAt: new Date('2024-01-02').getTime(),
        lastRevision: new Date('2024-01-06').getTime(),
        nextRevision: new Date('2024-01-13').getTime(),
        category: {
          fetch: () => ({
            name: 'Categoria 2',
          }),
        },
        subjects: {
          fetch: () => [
            {name: 'Assunto 1', color: '#ffffff'},
            {name: 'Assunto 2', color: '#d11cd5'},
          ],
        },
      },
    ],
    categories: [
      {
        id: 'category_1',
        name: 'Categoria 1',
        color: '#d11cd5',
        createdAt: new Date('2024-04-12').getTime(),
      },
      {
        id: 'category_2',
        name: 'Categoria 2',
        color: '#f2f2f2',
        createdAt: new Date('2024-03-12').getTime(),
      },
    ],
    subjects: [
      {id: 'subject_1', name: 'Assunto 1', color: '#ffffff'},
      {id: 'subject_2', name: 'Assunto 2', color: '#d11cd5'},
    ],
  };

  const getMockedData = tableName => mockedData[tableName] || [];

  return {
    withDatabase: jest.fn(Component => props => {
      const mockDatabase = {
        get: jest.fn(tableName => ({
          query: jest.fn(() => ({
            observe: jest.fn(() => ({
              subscribe: jest.fn(callback => {
                callback(getMockedData(tableName));
                return {unsubscribe: jest.fn()};
              }),
            })),
            observeWithColumns: jest.fn(() => ({
              subscribe: jest.fn(callback => {
                callback(getMockedData(tableName));
                return {unsubscribe: jest.fn()};
              }),
            })),
          })),
          findAndObserve: jest.fn(() => ({
            subscribe: jest.fn(callback => {
              callback(getMockedData(tableName));
              return {unsubscribe: jest.fn()};
            }),
          })),
        })),
      };

      return <Component {...props} database={mockDatabase} />;
    }),
  };
});

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

jest.mock('react-native-paper', () => {
  const React = require('react');
  const {View, Text} = require('react-native');

  const Dialog = ({visible, children}) =>
    visible ? <View testID="MockDialog">{children}</View> : null;

  Dialog.Title = ({children}) => (
    <Text testID="MockDialogTitle">{children}</Text>
  );
  Dialog.Content = ({children}) => (
    <View testID="MockDialogContent">{children}</View>
  );
  Dialog.Actions = ({children}) => (
    <View testID="MockDialogActions">{children}</View>
  );

  const Portal = ({children}) => <View>{children}</View>;

  return {
    ...jest.requireActual('react-native-paper'),
    Dialog,
    Portal,
  };
});

jest.mock('react-native-date-picker', () => {
  const React = require('react');
  return ({date, onDateChange, mode}) => {
    return (
      <div>
        <p>Mocked DatePicker</p>
        <p>Mode: {mode}</p>
        <p>Date: {date ? date.toISOString() : 'No date'}</p>
        <button onClick={() => onDateChange(new Date('2025-01-01T00:00:00Z'))}>
          Change Date
        </button>
      </div>
    );
  };
});
