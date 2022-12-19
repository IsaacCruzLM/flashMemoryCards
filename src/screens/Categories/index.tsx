import React from 'react';

import DefaultContainerView from '../../components/DefaultContainerView';
import CategoryListCard from '../../components/CategoryListCard';
import FloatingAddButton from '../../components/FloatingAddButton';

// import styles from './styles';

const Categories = () => {
  return (
    <DefaultContainerView>
      <CategoryListCard
        title={'Categoria 1'}
        creationDate={'24/04/1997'}
        numberOfNotes={16}
        icon={'cloud-download'}
        numberNotesToReview={2}
      />
      <FloatingAddButton routeName="Home" />
    </DefaultContainerView>
  );
};

export default Categories;
