import React from 'react';
import renderer from 'react-test-renderer';
import Create from './index';

describe('Category Create Screen', () => {
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

  it('render name input correctly', () => {
    const root = tree.root;

    const textInput = root.findByProps({testID: 'text-input-outlined'});
    const textLabel = root.findByProps({
      testID: 'text-input-outlined-label-active',
    });
    const textPlaceholder = root.findByProps({
      testID: 'text-input-outlined-label-inactive',
    });

    expect(textLabel.props.children).toBe('Nome da categoria');
    expect(textPlaceholder.props.children).toBe('Nome da categoria');

    // Change the resume name input
    textInput.props.onChangeText('Categoria Teste');
    expect(textInput.props.value).toBe('Categoria Teste');
  });

  it('render select icon input correctly', () => {
    const root = tree.root;

    const textInputLabel = root.find(
      node =>
        (node.type as String) === 'Text' &&
        node.props.children === 'Selecione um icone',
    );
    expect(textInputLabel).toBeTruthy();

    const iconsContainer = root.findByProps({
      testID: 'select-icon-container',
    });
    expect(iconsContainer).toBeTruthy();
    expect(iconsContainer.props.children).toHaveLength(3);
  });

  it('render action buttons correctly', () => {
    const root = tree.root;

    const buttonToCreate = root.findByProps({
      testID: 'ButtonTestID Criar  Categoria',
    });
    const buttonToCancel = root.findByProps({
      testID: 'ButtonTestID Cancelar',
    });

    expect(buttonToCreate).toBeTruthy();
    expect(buttonToCancel).toBeTruthy();
  });
});
