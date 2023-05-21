import React from 'react';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextEditor from '../../../components/TextEditor';

const Show = () => {
  return (
    <DefaultContainerView>
      <TextEditor
        onChange={() => {}}
        placeHolder="Escreva sua anotação aqui!"
      />
    </DefaultContainerView>
  );
};

export default Show;
