import React from 'react';

import ListCard from '../../components/ListCard';
import DefaultContainerView from '../../components/DefaultContainerView';

// import styles from './styles';

const Home = () => {
  return (
    <DefaultContainerView>
      <ListCard
        title={'Titulo da anotação'}
        creationDate={'24/04/1997'}
        lastRevisionDate={'24/04/1998'}
        noteType={'Texto'}
        category={'Categoria X'}
        subjects={[
          {content: 'Assunto 1', color: '#C31717'},
          {content: 'Assunto 2', color: '#8db4e0'},
        ]}
      />
    </DefaultContainerView>
  );
};

export default Home;
