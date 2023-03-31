import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import AppContext from '../../../context/appContext';
import NavigationService from '../../../navigation/NavigationService';

import CategoryListCard from '../../../components/CategoryListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';

import styles from './styles';

const List = ({categories}: any) => {
  const {setCurrentCategoryName} = useContext(AppContext);
  console.log(categories);
  return (
    <>
      <FlatList
        data={categories}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => (
          <CategoryListCard
            title={item.name}
            creationDate={'24/04/1997'}
            numberOfNotes={16}
            icon={item.icon}
            numberNotesToReview={2}
            onPress={() => {
              setCurrentCategoryName(item.name);
              NavigationService.navigate('Notes', {categoryId: item.id});
            }}
          />
        )}
        style={styles.flatList}
      />
      <FloatingAddButton routeName="NewCategory" />
    </>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => ({
    categories: database.get('categories').query(),
  })),
)(List);
