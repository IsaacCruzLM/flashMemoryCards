import React from 'react';
import renderer from 'react-test-renderer';
import LoadingPage from './index';

describe('LoadingPage', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<LoadingPage />).toJSON();
    expect(tree).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });

  it('should render with loading indicator', () => {
    const testRenderer = renderer.create(<LoadingPage />);
    const testInstance = testRenderer.root;

    const activityIndicator = testInstance.findByProps({
      testID: 'loading-indicator',
    });

    expect(activityIndicator).toBeTruthy();
  });

  it('should apply container styles', () => {
    const testRenderer = renderer.create(<LoadingPage />);
    const testInstance = testRenderer.root;

    const container = testInstance.findByProps({
      testID: 'loading-container',
    });

    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }),
    );
  });
});
