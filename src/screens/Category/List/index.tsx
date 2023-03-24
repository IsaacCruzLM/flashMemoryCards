import React from 'react';

import NavigationService from '../../../navigation/NavigationService';

import DefaultContainerView from '../../../components/DefaultContainerView';
import CategoryListCard from '../../../components/CategoryListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';

// import styles from './styles';

const List = () => {
  return (
    <DefaultContainerView>
      <CategoryListCard
        title={'Categoria 1'}
        creationDate={'24/04/1997'}
        numberOfNotes={16}
        icon={'cloud-download'}
        numberNotesToReview={2}
        onPress={() => {
          NavigationService.navigate('Notes', {categoryId: 'IdTeste'});
        }}
      />
      <FloatingAddButton routeName="NewCategory" />
    </DefaultContainerView>
  );
};

export default List;
