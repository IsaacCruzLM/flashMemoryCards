import React from 'react';

import DefaultContainerView from '../../../components/DefaultContainerView';
import TextEditor from '../../../components/TextEditor';

import {ShowProps} from './types';

const Show: React.FunctionComponent<ShowProps | any> = ({content}) => {
  return (
    <DefaultContainerView>
      <TextEditor
        initialContentHTML={content}
        onChange={() => {}}
        placeHolder="Escreva sua anotação aqui!"
      />
    </DefaultContainerView>
  );
};

export default Show;
