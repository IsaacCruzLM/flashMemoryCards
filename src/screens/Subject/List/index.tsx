import React from 'react';
import {FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import NavigationService from '../../../navigation/NavigationService';

import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';

import styles from './styles';
import {Text} from 'react-native-paper';

const List = ({subjects}: any) => {
  if (subjects.length <= 0) {
    return (
      <EmpytMessage
        message={'Nenhum Assunto Encontrad0'}
        actionLabel={'Crie um novo assunto'}
        onPressAction={() => NavigationService.navigate('NewSubject')}
      />
    );
  }

  return (
    <>
      <FlatList
        data={subjects}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <Text>{item.name}</Text>;
        }}
        style={styles.flatList}
      />
      <FloatingAddButton routeName="NewSubject" />
    </>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => ({
    subjects: database
      .get('subjects')
      .query()
      .observeWithColumns(['name', 'color']),
  })),
)(List);
