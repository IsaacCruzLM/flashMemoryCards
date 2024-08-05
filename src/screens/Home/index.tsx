import React from 'react';
import {FlatList} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {compose} from 'recompose';

import DefaultContainerView from '../../components/DefaultContainerView';
import NoteListCard from '../../components/NoteListCard';
import FloatingAddButton from '../../components/FloatingAddButton';

import EmpytListMessage from './components/EmpytListMessage';

import styles from './styles';

const Home = ({notes}: any) => {
  return (
    <DefaultContainerView>
      <FlatList
        data={notes}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const {name, createdAt, lastRevision} = item;

          return (
            <NoteListCard
              title={name}
              creationDate={new Date(createdAt).toLocaleDateString('pt-BR')}
              lastRevisionDate={new Date(lastRevision).toLocaleDateString(
                'pt-BR',
              )}
              noteType={'Texto'}
              category={'Categoria X'}
              subjects={[
                {content: 'Assunto 1', color: '#C31717'},
                {content: 'Assunto 2', color: '#8db4e0'},
              ]}
            />
          );
        }}
        style={styles.flatList}
        ListEmptyComponent={() => <EmpytListMessage />}
      />
      <FloatingAddButton routeName="NewNote" />
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => {
    return {
      notes: database.get('notes').query(),
    };
  }),
)(Home);
