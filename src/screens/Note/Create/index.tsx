import React from 'react';
import {Text} from 'react-native';

import DefaultContainerView from '../../../components/DefaultContainerView';

// import styles from './styles';
// import {CreateProps} from './types';

const Create: React.FunctionComponent<any> = () => {
  return (
    <DefaultContainerView>
      <Text>Create a Note</Text>
    </DefaultContainerView>
  );
};

export default Create;
