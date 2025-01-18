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

  it('fill the name form correctly', () => {
    const root = tree.root;

    const textInput = root.findByProps({testID: 'text-input-outlined'});
    const textLabel = root.findByProps({
      testID: 'text-input-outlined-label-active',
    });
    const textPlaceholder = root.findByProps({
      testID: 'text-input-outlined-label-inactive',
    });

    expect(textLabel.props.children).toBe('Nome do resumo');
    expect(textPlaceholder.props.children).toBe('Nome do resumo');

    // Change the resume name input
    textInput.props.onChangeText('Nome Teste');
    expect(textInput.props.value).toBe('Nome Teste');
  });

  it('render categories select correctly', () => {
    const root = tree.root;

    const textInputLabel = root.find(
      node =>
        (node.type as String) === 'Text' &&
        node.props.children === 'Selecione as categorias do resumo',
    );

    expect(textInputLabel).toBeTruthy();

    const selectMultipleInput = root.findByProps({
      testID: 'mockBottomSheetFlatList Selecione as categorias do resumo',
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
      testID: 'mockBottomSheetFlatList Selecione os assuntos do resumo',
    });

    expect(selectMultipleInput).toBeTruthy();
    expect(selectMultipleInput.props.data).toHaveLength(2);
  });

  it('render generate pdf resume button', () => {
    const root = tree.root;

    const button = root.findByProps({
      testID: 'ButtonTestID Gerar Resumo',
    });

    expect(button).toBeTruthy();
  });
});
