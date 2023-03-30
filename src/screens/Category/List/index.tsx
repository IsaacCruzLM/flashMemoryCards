import React, {useContext} from 'react';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {compose} from 'recompose';

import AppContext from '../../../context/appContext';
import NavigationService from '../../../navigation/NavigationService';

import DefaultContainerView from '../../../components/DefaultContainerView';
import CategoryListCard from '../../../components/CategoryListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';

// import styles from './styles';

const List = ({categories}: any) => {
  const {setCurrentCategoryName} = useContext(AppContext);
  console.log(categories);
  return (
    <DefaultContainerView>
      <CategoryListCard
        title={'Categoria 1'}
        creationDate={'24/04/1997'}
        numberOfNotes={16}
        icon={'cloud-download'}
        numberNotesToReview={2}
        onPress={() => {
          setCurrentCategoryName('Categoria 1');
          NavigationService.navigate('Notes', {categoryId: 'IdTeste'});
        }}
      />
      <FloatingAddButton routeName="NewCategory" />
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => ({
    categories: database.get('categories').query(),
  })),
)(List);
