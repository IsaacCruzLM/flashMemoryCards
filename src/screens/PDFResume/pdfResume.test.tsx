import React from 'react';
import renderer from 'react-test-renderer';
import PDFResumeScreen from './index';

jest.useFakeTimers();

describe('PDFResume Screen', () => {
  let tree: renderer.ReactTestRenderer;
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    tree = renderer.create(<PDFResumeScreen />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    expect(tree.toJSON()).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
