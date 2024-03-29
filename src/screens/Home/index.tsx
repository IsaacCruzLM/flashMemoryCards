import React from 'react';

import DefaultContainerView from '../../components/DefaultContainerView';
import NoteListCard from '../../components/NoteListCard';
import FloatingAddButton from '../../components/FloatingAddButton';

// import styles from './styles';

const Home = () => {
  return (
    <DefaultContainerView>
      <NoteListCard
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
      <FloatingAddButton routeName="NewNote" />
    </DefaultContainerView>
  );
};

export default Home;
