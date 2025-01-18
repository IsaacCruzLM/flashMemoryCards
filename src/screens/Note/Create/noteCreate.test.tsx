import React from 'react';
import renderer from 'react-test-renderer';
import Create from './index';

jest.mock('@react-navigation/elements', () => {
  return {
    __esModule: true,
    useHeaderHeight: jest.fn().mockReturnValue(50), // Retorna a altura mockada
  };
});

describe('Note Create Screen', () => {
  let tree: renderer.ReactTestRenderer;
  beforeEach(() => {
    jest.clearAllMocks();

    tree = renderer.create(<Create />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    expect(tree.toJSON()).toBeTruthy();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render all text inputs correctly', () => {
    const root = tree.root;

    const textInputs = root.findAllByProps({testID: 'text-input-outlined'});
    const textLabels = root.findAllByProps({
      testID: 'text-input-outlined-label-active',
    });
    const textPlaceholders = root.findAllByProps({
      testID: 'text-input-outlined-label-inactive',
    });

    expect(textInputs).toHaveLength(4);
    expect(textLabels).toHaveLength(14);
    expect(textPlaceholders).toHaveLength(14);
  });

  it('render categories select correctly', () => {
    const root = tree.root;

    const textInputLabel = root.find(
      node =>
        (node.type as String) === 'Text' &&
        node.props.children === 'Selecione uma categoria',
    );

    expect(textInputLabel).toBeTruthy();

    const selectMultipleInput = root.findByProps({
      testID: 'mockBottomSheetFlatList Selecione uma categoria',
    });

    expect(selectMultipleInput).toBeTruthy();
    expect(selectMultipleInput.props.data).toHaveLength(2);
  });

  it('render subjects select correctly', () => {
    const root = tree.root;

    const textInputLabel = root.findAll(
      node =>
        (node.type as String) === 'Text' &&
        node.props.children === 'Selecionar Assuntos',
    );

    expect(textInputLabel).toHaveLength(2);

    const selectMultipleInput = root.findByProps({
      testID: 'mockBottomSheetFlatList Selecione vários assuntos',
    });

    expect(selectMultipleInput).toBeTruthy();
    expect(selectMultipleInput.props.data).toHaveLength(2);
  });

  it('render action button correctly', () => {
    const root = tree.root;

    const buttonToCancel = root.findByProps({
      testID: 'ButtonTestID Proximo',
    });

    expect(buttonToCancel).toBeTruthy();
  });
});
