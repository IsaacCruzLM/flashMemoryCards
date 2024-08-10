import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {compose} from 'recompose';

import DefaultContainerView from '../../components/DefaultContainerView';
import NoteListCard from '../../components/NoteListCard';
import FloatingAddButton from '../../components/FloatingAddButton';
import EmpytListMessage from './components/EmpytListMessage';

import noteNeedToBeRevised from '../../utils/noteValidations';
import useGetFromGlobalState from '../../hooks/useGetFromGlobalState';
import {NoteModelType} from '../../databases/models/noteModel';

import styles from './styles';
import {CardData} from '../Note/List/types';

const Home = ({notes}: any) => {
  const [notesToRevise, setNotesToRevise] = useState([] as CardData[]);
  const searchQuery = useGetFromGlobalState('searchParams.Notes', '');

  useEffect(() => {
    const fetchNotes = async () => {
      if (notes.length > 0) {
        const notesDataToRevise = [] as Array<CardData>;
        await Promise.all(
          notes
            .filter(noteNeedToBeRevised)
            //.filter(true) // Filtro manual aqui
            .map(async (note: NoteModelType) => {
              const categoryName = (await note.category.fetch()).name;
              const subjectsFetch = await note.subjects.fetch();
              if (note.name.includes(searchQuery)) {
                notesDataToRevise.push({
                  id: note.id,
                  title: note.name,
                  creationDate: new Date(note.createdAt).toLocaleDateString(
                    'pt-BR',
                  ),
                  lastRevisionDate: new Date(
                    note.lastRevision,
                  ).toLocaleDateString('pt-BR'),
                  noteType: 'Texto',
                  category: categoryName,
                  subjects: (subjectsFetch || []).map(({name, color}: any) => ({
                    content: name,
                    color,
                  })),
                });
              }
            }),
        );

        setNotesToRevise(notesDataToRevise);
      }
    };

    fetchNotes();
  }, [notes, searchQuery]);

  return (
    <DefaultContainerView>
      <FlatList
        data={notesToRevise}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const {
            title,
            creationDate,
            lastRevisionDate,
            noteType,
            category,
            subjects,
          } = item;

          return (
            <NoteListCard
              title={title}
              creationDate={creationDate}
              lastRevisionDate={lastRevisionDate}
              noteType={noteType}
              category={category}
              subjects={subjects}
            />
          );
        }}
        style={styles.flatList}
        ListEmptyComponent={() => <EmpytListMessage />}
      />
      <FloatingAddButton routeName="NewNote" />
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => {
    return {
      notes: database.get('notes').query(),
    };
  }),
)(Home);
