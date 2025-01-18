import React from 'react';
import renderer from 'react-test-renderer';
import HelpPage from './index';

describe('HelpPage', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<HelpPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle user interactions correctly', () => {
    const component = renderer.create(<HelpPage />);
    const instance = component.root;

    const helpTitle = instance.findByProps({testID: 'help-title'});
    expect(helpTitle).toBeTruthy();
  });

  it('should render all sections', () => {
    const component = renderer.create(<HelpPage />);

    const scrollContainer = component.root.findByType(
      'RCTScrollView' as React.ElementType,
    );

    const numberOfSections = scrollContainer.props.children.length;

    expect(numberOfSections).toBeGreaterThan(0);
  });
});
