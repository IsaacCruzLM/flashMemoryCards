import React from 'react';
import renderer, {ReactTestInstance} from 'react-test-renderer';
import List from './index';

describe('Category List Screen', () => {
  let tree: renderer.ReactTestRenderer;
  beforeEach(() => {
    jest.clearAllMocks();

    tree = renderer.create(<List />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    expect(tree.toJSON()).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render should render flat list', () => {
    const flatList = tree.root.findByType('RCTScrollView' as React.ElementType);
    expect(flatList).toBeTruthy();
  });

  it('should render should render two categories', () => {
    const testInstance = tree.root;

    const matchingTexts = testInstance.findAll((node: ReactTestInstance) => {
      return (
        (node.type as string) === 'Text' &&
        (node.children as string[]).some((text: string) =>
          text.includes('Categoria'),
        )
      );
    });

    expect(matchingTexts.length).toBe(2);
  });
});
