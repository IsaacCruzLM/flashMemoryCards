/**
 * @format
 */
import React from 'react';
import 'react-native';
import InitialPage from './index';
import renderer from 'react-test-renderer';

jest.mock('../../navigation/NavigationService', () => ({
  navigate: jest.fn(),
}));

jest.mock('../../assets/logo.svg', () => 'LogoSvg');

jest.mock('../../components/Button', () => {
  return {
    __esModule: true,
    default: ({label}: {onPress: () => void; label: string}) =>
      `Button-${label}`,
  };
});

describe('InitialPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<InitialPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('navigates to Tutorial screen when button is pressed', () => {
    const NavigationService = require('../../navigation/NavigationService');
    const component = renderer.create(<InitialPage />);

    // Find the Button component
    const instance = component.root;
    const button = instance.findByProps({label: 'Entrar'});

    // Trigger the onPress event
    button.props.onPress();

    // Verify navigation
    expect(NavigationService.navigate).toHaveBeenCalledWith('Tutorial');
  });

  it('initializes animations on mount', () => {
    const reanimated = require('react-native-reanimated');
    renderer.create(<InitialPage />);

    // Verify that animations are initialized
    expect(reanimated.useSharedValue).toHaveBeenCalledWith(0);
    expect(reanimated.useSharedValue).toHaveBeenCalledWith(30);
    expect(reanimated.withTiming).toHaveBeenCalled();
    expect(reanimated.withRepeat).toHaveBeenCalled();
  });
});
