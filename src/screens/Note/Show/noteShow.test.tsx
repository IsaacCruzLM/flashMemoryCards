import React from 'react';
import renderer from 'react-test-renderer';
import Show from './index';

describe('Note Show Screen', () => {
  let tree: renderer.ReactTestRenderer;
  beforeEach(() => {
    jest.clearAllMocks();

    tree = renderer.create(<Show />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    expect(tree.toJSON()).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render action button correctly', () => {
    const root = tree.root;

    const buttonToCancel = root.findByProps({
      testID: 'ButtonTestID Salvar Anotação',
    });

    expect(buttonToCancel).toBeTruthy();
  });
});
