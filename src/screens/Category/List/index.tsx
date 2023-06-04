import React, {useState} from 'react';
import {FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import NavigationService from '../../../navigation/NavigationService';

import CategoryListCard from '../../../components/CategoryListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';

import styles from './styles';
import noteNeedToBeRevised from '../../../utils/noteValidations';

const List = ({categories, notes}: any) => {
  if (categories.length <= 0) {
    return (
      <EmpytMessage
        message={'Nenhuma Categoria Encontrada'}
        actionLabel={'Crie uma nova categoria'}
        onPressAction={() => NavigationService.navigate('NewCategory')}
      />
    );
  }

  const getNotesByCategory = categoryId => {
    let totalOfNotes = 0;
    let numberOfNotesToRevision = 0;

    notes
      .filter(note => note.category.id === categoryId)
      .map(note => {
        totalOfNotes += 1;
        if (noteNeedToBeRevised(note)) {
          numberOfNotesToRevision += 1;
        }
      });

    return {totalOfNotes, numberOfNotesToRevision};
  };

  return (
    <>
      <FlatList
        data={categories}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const {id, name, createdAt, icon, color} = item;
          const {numberOfNotesToRevision, totalOfNotes} =
            getNotesByCategory(id);

          return (
            <CategoryListCard
              title={name}
              creationDate={createdAt.toLocaleDateString('pt-br')}
              numberOfNotes={totalOfNotes}
              icon={icon}
              iconColor={color}
              numberNotesToReview={numberOfNotesToRevision}
              onPress={() => {
                NavigationService.navigate('Notes', {
                  categoryName: name,
                  categoryId: id,
                });
              }}
              containerStyle={styles.itemStyle}
            />
          );
        }}
        style={styles.flatList}
      />
      <FloatingAddButton routeName="NewCategory" />
    </>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => ({
    categories: database
      .get('categories')
      .query()
      .observeWithColumns(['name', 'icon', 'color']),
    notes: database
      .get('notes')
      .query()
      .observeWithColumns(['name', 'category_id']),
  })),
)(List);
