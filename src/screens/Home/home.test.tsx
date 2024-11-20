import React from 'react';
import renderer from 'react-test-renderer';
import Home from './index';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
};

// Mock Date Picker
jest.mock('react-native-date-picker', () => {
  return jest.fn().mockImplementation(({onConfirm, onCancel}) => {
    return {
      render: () => null,
      onConfirm,
      onCancel,
    };
  });
});

// Mock any potential Redux actions/hooks if you're using them
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

jest.mock('react-native-paper', () => {
  const ActualReactNativePaper = jest.requireActual('react-native-paper');
  return {
    ...ActualReactNativePaper,
    Modal: ({children}: {children: React.ReactNode}) => <>{children}</>, // Simplesmente renderize os filhos, sem animações ou funcionalidade real
  };
});

describe('Home Screen', () => {
  let tree: renderer.ReactTestRenderer;
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    tree = renderer.create(<Home navigation={mockNavigation} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', async () => {
    expect(tree.toJSON()).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
