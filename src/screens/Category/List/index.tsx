import React from 'react';
import {FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import NavigationService from '../../../navigation/NavigationService';

import CategoryListCard from '../../../components/CategoryListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';

import styles from './styles';

const List = ({categories}: any) => {
  if (categories.length <= 0) {
    return (
      <EmpytMessage
        message={'Nenhuma Categoria Encontrada'}
        actionLabel={'Crie uma nova categoria'}
        onPressAction={() => NavigationService.navigate('NewCategory')}
      />
    );
  }

  return (
    <>
      <FlatList
        data={categories}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const {id, name, createdAt, icon, color} = item;
          return (
            <CategoryListCard
              title={name}
              creationDate={createdAt.toLocaleDateString('pt-br')}
              numberOfNotes={16}
              icon={icon}
              iconColor={color}
              numberNotesToReview={2}
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
  })),
)(List);
