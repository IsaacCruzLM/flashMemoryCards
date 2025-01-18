import React from 'react';
import renderer from 'react-test-renderer';
import Create from './index';

describe('Subject Create Screen', () => {
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

    expect(textLabel.props.children).toBe('Nome do assunto');
    expect(textPlaceholder.props.children).toBe('Nome do assunto');

    // Change the resume name input
    textInput.props.onChangeText('Assunto Teste');
    expect(textInput.props.value).toBe('Assunto Teste');
  });

  it('render icon color input correctly', () => {
    const root = tree.root;

    const colorInputLabel = root.find(
      node =>
        (node.type as String) === 'Text' &&
        node.props.children === 'Cor do Icone',
    );
    expect(colorInputLabel).toBeTruthy();
  });

  it('render action buttons correctly', () => {
    const root = tree.root;

    const buttonToCreate = root.findByProps({
      testID: 'ButtonTestID Criar  Assunto',
    });
    const buttonToCancel = root.findByProps({
      testID: 'ButtonTestID Cancelar',
    });

    expect(buttonToCreate).toBeTruthy();
    expect(buttonToCancel).toBeTruthy();
  });
});
