import React, {ElementType} from 'react';
import renderer, {act, ReactTestRenderer} from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TutorialPage from './index';

jest.mock('../../navigation/NavigationService', () => ({
  navigate: jest.fn(),
}));

jest.mock('../../databases/utils', () => {
  return {
    __esModule: true,
    default: {
      insertItemInWMDB: jest.fn(() => Promise.resolve()),
    },
  };
});

jest.mock('../../components/Button', () => {
  return {
    __esModule: true,
    default: 'Button',
  };
});

describe('TutorialPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with initial state', () => {
    let tree: ReactTestRenderer;

    act(() => {
      tree = renderer.create(<TutorialPage />);
    });

    expect(tree!.toJSON()).toMatchSnapshot();
  });

  it('enables button after timeout', () => {
    let tree: ReactTestRenderer;

    act(() => {
      tree = renderer.create(<TutorialPage />);
    });

    // Initial state - button should be disabled
    expect(
      tree!.root.findByType('Button' as ElementType).props.disabled,
    ).toBeTruthy();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(6500);
    });

    // Button should be enabled
    expect(
      tree!.root.findByType('Button' as ElementType).props.disabled,
    ).toBeFalsy();
  });

  it('handles button press correctly', async () => {
    const NavigationService = require('../../navigation/NavigationService');
    const WmdbUtils = require('../../databases/utils').default;

    let tree: ReactTestRenderer;

    await act(async () => {
      tree = renderer.create(<TutorialPage />);
    });

    // Enable button
    await act(async () => {
      jest.advanceTimersByTime(6500);
    });

    // Press button and wait for all promises to resolve
    await act(async () => {
      const button = tree!.root.findByType('Button' as ElementType);
      await button.props.onPress();
      await Promise.resolve();
      jest.runAllTimers();
    });

    // Wait for a tick to ensure all promises are settled
    await act(async () => {
      await new Promise(resolve => setImmediate(resolve));
    });

    // Verify AsyncStorage was called
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('tutorialSeen', 'true');

    // Verify database insertions
    expect(WmdbUtils.insertItemInWMDB).toHaveBeenCalledTimes(2);
    expect(WmdbUtils.insertItemInWMDB).toHaveBeenCalledWith('categories', {
      color: '#000000',
      createdAt: expect.any(Date),
      icon: 'archive-edit',
      name: 'Minhas Anotações',
    });
    expect(WmdbUtils.insertItemInWMDB).toHaveBeenCalledWith('subjects', {
      color: '#00c65c',
      createdAt: expect.any(Date),
      name: 'Geral',
    });

    // Verify navigation
    expect(NavigationService.navigate).toHaveBeenCalledWith('Home');
  });

  it('initializes animations correctly', () => {
    const reanimated = require('react-native-reanimated');

    act(() => {
      renderer.create(<TutorialPage />);
    });

    expect(reanimated.useSharedValue).toHaveBeenCalledWith(0);

    // Verify each call with its specific delay
    expect(reanimated.withDelay).toHaveBeenCalledTimes(4);
    expect(reanimated.withDelay).toHaveBeenNthCalledWith(1, 0, undefined);
    expect(reanimated.withDelay).toHaveBeenNthCalledWith(2, 2000, undefined);
    expect(reanimated.withDelay).toHaveBeenNthCalledWith(3, 4000, undefined);
    expect(reanimated.withTiming).toHaveBeenCalledWith(1, {duration: 500});
  });
});
