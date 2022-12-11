import React from 'react';
import {View} from 'react-native';

import ListCard from '../../components/ListCard';

import styles from './styles';

const Home = () => {
  return (
    <View style={styles.container}>
      <ListCard
        title={'Titulo da anotação'}
        creationDate={'24/04/1997'}
        lastRevisionDate={'24/04/1998'}
        noteType={'Texto'}
        category={'Categoria X'}
        subjects={[
          {content: 'Assunto 1', color: '#C31717'},
          {content: 'Assunto 2', color: '#1766C3'},
        ]}
      />
    </View>
  );
};

export default Home;
