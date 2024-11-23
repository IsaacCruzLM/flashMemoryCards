import React from 'react';
import renderer from 'react-test-renderer';
import List from './index';

describe('Category List Screen', () => {
  let tree: renderer.ReactTestRenderer;
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    tree = renderer.create(<List />);
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
