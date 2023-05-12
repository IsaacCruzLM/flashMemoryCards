import React from 'react';
import {Text, SectionList} from 'react-native';
import get from 'lodash/get';

import NoteListCard from '../../../components/NoteListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';

import styles from './styles';

const DATA_MOCK = [
  {
    title: 'Anotações a serem revisadas',
    data: [
      {
        title: 'Titulo da anotação 1',
        creationDate: '24/04/1997',
        lastRevisionDate: '24/04/1998',
        noteType: 'Texto',
        category: 'Categoria X',
        subjects: [
          {content: 'Assunto 1', color: '#C31717'},
          {content: 'Assunto 2', color: '#8db4e0'},
        ],
      },
      {
        title: 'Titulo da anotação 2',
        creationDate: '24/04/1997',
        lastRevisionDate: '24/04/1998',
        noteType: 'Texto',
        category: 'Categoria X',
        subjects: [
          {content: 'Assunto 1', color: '#C31717'},
          {content: 'Assunto 2', color: '#8db4e0'},
        ],
      },
    ],
  },
  {
    title: 'Demais Anotações',
    data: [
      {
        title: 'Titulo da anotação 3',
        creationDate: '24/04/1997',
        lastRevisionDate: '24/04/1998',
        noteType: 'Texto',
        category: 'Categoria X',
        subjects: [
          {content: 'Assunto 1', color: '#C31717'},
          {content: 'Assunto 2', color: '#8db4e0'},
        ],
      },
      {
        title: 'Titulo da anotação 4',
        creationDate: '24/04/1997',
        lastRevisionDate: '24/04/1998',
        noteType: 'Texto',
        category: 'Categoria X',
        subjects: [
          {content: 'Assunto 1', color: '#C31717'},
          {content: 'Assunto 2', color: '#8db4e0'},
        ],
      },
    ],
  },
];

const List = ({route}) => {
  return (
    <>
      <SectionList
        sections={DATA_MOCK}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({item}) => (
          <NoteListCard
            title={item.title}
            creationDate={item.creationDate}
            lastRevisionDate={item.lastRevisionDate}
            noteType={item.noteType}
            category={item.category}
            subjects={item.subjects}
            containerStyle={styles.cardCustomStyle}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        style={styles.sectionList}
      />
      <FloatingAddButton
        routeName="NewNote"
        params={{categoryId: get(route, 'params.categoryId', '')}}
      />
    </>
  );
};

export default List;
