import React from 'react';
import renderer, {act} from 'react-test-renderer';
import Home from './index';

jest.useFakeTimers();

jest.mock('../../navigation/NavigationService', () => ({
  navigate: jest.fn(),
}));

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

describe('Home Screen', () => {
  let tree: renderer.ReactTestRenderer;
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    tree = renderer.create(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    expect(tree.toJSON()).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render flat list', () => {
    const flatList = tree.root.findByType('RCTScrollView' as React.ElementType);
    expect(flatList).toBeTruthy();
  });

  it('navigates to New Note screen when floating button is pressed', () => {
    // Find the Button component
    const NavigationService = require('../../navigation/NavigationService');
    const instance = tree.root;

    const floatingButtonContainer = instance.findByProps({
      testID: 'floating-add-container',
    });
    expect(floatingButtonContainer).toBeTruthy();

    const floatingButton = instance.findByProps({
      testID: 'floating-add-button',
    });
    floatingButton.props.onPress();

    // Verify navigation
    expect(NavigationService.navigate).toHaveBeenCalledWith('NewNote', {});
  });

  it('render flat list with itens', async () => {
    let component: renderer.ReactTestRenderer;

    await act(() => {
      component = renderer.create(<Home />);
    });

    const flatList = component.root.findByType(
      'RCTScrollView' as React.ElementType,
    );

    const numberOfChildren = flatList.props.children.length;

    expect(numberOfChildren).toBe(2);
  });
});
