import React from 'react';
import {FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import NavigationService from '../../../navigation/NavigationService';
import useFilterBySearchParams from '../../../hooks/useFilterBySearchParams';

import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';
import SubjectListCard from '../../../components/SubjectListCard';
import EmpytListMessage from '../../../components/EmpytListMessage';

import styles from './styles';

const List = ({subjects}: any) => {
  const filteredSubjects = useFilterBySearchParams(
    subjects,
    'Subjects',
    'name',
  );

  if (subjects.length <= 0) {
    return (
      <EmpytMessage
        message={'Nenhum Assunto Encontrado'}
        actionLabel={'Crie um novo assunto'}
        onPressAction={() => NavigationService.navigate('NewSubject')}
      />
    );
  }

  return (
    <>
      <FlatList
        data={filteredSubjects}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const {id, name, color} = item;
          return (
            <SubjectListCard
              title={name}
              subjectColor={color}
              onPress={() =>
                NavigationService.navigate('NewSubject', {
                  subjectId: id,
                  isEdit: true,
                })
              }
              containerStyle={styles.itemStyle}
            />
          );
        }}
        ListEmptyComponent={() => <EmpytListMessage itemName="assunto" />}
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
