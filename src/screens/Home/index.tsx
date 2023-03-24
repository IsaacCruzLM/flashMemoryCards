import React from 'react';

import ListCard from '../../components/ListCard';
import DefaultContainerView from '../../components/DefaultContainerView';

import InlineField from '../../components/InlineField';
import InlineFieldChips from '../../components/InlineFieldChips';

// import styles from './styles';

const Home = () => {
  return (
    <DefaultContainerView>
      <ListCard title={'Titulo da anotação'}>
        <InlineField label="Data de criação" content={'24/04/1997'} />
        <InlineField label="Ultima revisão" content={'24/04/1998'} />
        <InlineField label="Tipo de anotação" content={'Texto'} />
        <InlineField label="Categoria" content={'Categoria X'} />
        <InlineFieldChips
          label="Assuntos"
          arrayOfContents={[
            {content: 'Assunto 1', color: '#C31717'},
            {content: 'Assunto 2', color: '#8db4e0'},
          ]}
        />
      </ListCard>
    </DefaultContainerView>
  );
};

export default Home;
