import React from 'react';

import DefaultContainerView from '../../components/DefaultContainerView';
import CategoryListCard from '../../components/CategoryListCard';

// import styles from './styles';

const Categories = () => {
  return (
    <DefaultContainerView>
      <CategoryListCard
        title={'Categoria 1'}
        creationDate={'24/04/1997'}
        numberOfNotes={16}
        icon={'cloud-download'}
      />
    </DefaultContainerView>
  );
};

export default Categories;
