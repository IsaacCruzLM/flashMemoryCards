import React, {useState} from 'react';

import DefaultContainerView from '../../components/DefaultContainerView';
import TextInput from '../../components/TextInput';

// import styles from './styles';

const NewCategory = () => {
  const [name, setName] = useState('');
  return (
    <DefaultContainerView>
      <TextInput
        label={'Nome da categoria'}
        setText={setName}
        placeholder={'Nome da categoria'}
        value={name}
      />
    </DefaultContainerView>
  );
};

export default NewCategory;
