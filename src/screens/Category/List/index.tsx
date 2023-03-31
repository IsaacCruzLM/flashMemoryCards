import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import AppContext from '../../../context/appContext';
import NavigationService from '../../../navigation/NavigationService';

import CategoryListCard from '../../../components/CategoryListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';

import styles from './styles';

const List = ({categories}: any) => {
  const {setCurrentCategoryName} = useContext(AppContext);

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
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => (
          <CategoryListCard
            title={item.name}
            creationDate={item.createdAt.toLocaleDateString('pt-br')}
            numberOfNotes={16}
            icon={item.icon}
            numberNotesToReview={2}
            onPress={() => {
              setCurrentCategoryName(item.name);
              NavigationService.navigate('Notes', {categoryId: item.id});
            }}
            containerStyle={styles.itemStyle}
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
