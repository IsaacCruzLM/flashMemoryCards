import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';
import get from 'lodash/get';

import NavigationService from '../../../navigation/NavigationService';
import noteNeedToBeRevised from '../../../utils/noteValidations';
import AppContext from '../../../context/appContext';

import CategoryListCard from '../../../components/CategoryListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';

import styles from './styles';
import {ListProps} from './types';
import {NoteModelType} from '../../../databases/models/noteModel';
import {CategoryModelType} from '../../../databases/models/categoryModel';

const List = ({categories, notes}: ListProps | any) => {
  const {globalState} = useContext(AppContext);

  if (categories.length <= 0) {
    return (
      <EmpytMessage
        message={'Nenhuma Categoria Encontrada'}
        actionLabel={'Crie uma nova categoria'}
        onPressAction={() => NavigationService.navigate('NewCategory')}
      />
    );
  }

  const getNotesByCategory = (categoryId: string) => {
    let totalOfNotes = 0;
    let numberOfNotesToRevision = 0;

    notes
      .filter((note: NoteModelType) => note.category.id === categoryId)
      .map((note: NoteModelType) => {
        totalOfNotes += 1;
        if (noteNeedToBeRevised(note)) {
          numberOfNotesToRevision += 1;
        }
      });

    return {totalOfNotes, numberOfNotesToRevision};
  };

  const filterCategories = () => {
    const searchQuery = get(globalState, 'searchParams.Categories', '');
    return searchQuery
      ? categories.filter((category: CategoryModelType) =>
          category.name.includes(searchQuery),
        )
      : categories;
  };

  return (
    <>
      <FlatList
        data={filterCategories()}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const {id, name, createdAt, icon, color} = item;
          const {numberOfNotesToRevision, totalOfNotes} =
            getNotesByCategory(id);

          return (
            <CategoryListCard
              title={name}
              creationDate={createdAt.toLocaleString('pt-BR')}
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
