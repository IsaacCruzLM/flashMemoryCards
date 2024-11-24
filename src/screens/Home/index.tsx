/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {FlatList} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {compose} from 'recompose';
import cloneDeep from 'lodash/cloneDeep';

import DefaultContainerView from '../../components/DefaultContainerView';
import NoteListCard from '../../components/NoteListCard';
import FloatingAddButton from '../../components/FloatingAddButton';
import EmpytListMessage from './components/EmpytListMessage';
import Dialog from '../../components/Dialog';
import {DEFAULT_FILTER_STATE, NotesFilter} from '../Note/List';

import noteNeedToBeRevised from '../../utils/noteValidations';
import useGetFromGlobalState from '../../hooks/useGetFromGlobalState';
import {NoteModelType} from '../../databases/models/noteModel';
import AppContext from '../../context/appContext';
import filterActions from '../../utils/filters';

import styles from './styles';
import {CardData} from '../Note/List/types';
import {rangeDataType} from '../../components/DataRangeInput/types';
import {filterState} from '../Note/List/types';

const Home = ({notes, categories, subjects, noteSubjects}: any) => {
  const {setFilterDialogOpenFunction} = useContext(AppContext);
  const [notesToRevise, setNotesToRevise] = useState([] as CardData[]);
  const [filters, setFilters] = useState(DEFAULT_FILTER_STATE as filterState);
  const searchQuery = useGetFromGlobalState('searchParams.Notes', '');
  const openFilterDialog = useGetFromGlobalState(
    'filterDialogOpen.Home',
    false,
  ) as boolean;

  const filterData = (note: NoteModelType) => {
    const {
      creationDate,
      lastRevision,
      category: categoryFilter,
      subjects: subjectsFilter,
    } = cloneDeep(filters);
    let dontFilter = true;

    if (categoryFilter && dontFilter) {
      dontFilter = note.category.id === categoryFilter;
    }

    if (subjectsFilter.length > 0 && dontFilter) {
      const subjectsIds = noteSubjects
        .filter((record: any) => record.note.id === note.id)
        .map((record: any) => record.subject.id);
      const someIdIsIncluded = subjectsIds.some((id: string) =>
        subjectsFilter.includes(id),
      );
      dontFilter = someIdIsIncluded;
    }

    if ((creationDate.init || creationDate.end) && dontFilter) {
      dontFilter = filterActions.rangeInputDateVerify(
        creationDate,
        note.createdAt.toString(),
      );
    }

    if ((lastRevision.init || lastRevision.end) && dontFilter) {
      dontFilter = filterActions.rangeInputDateVerify(
        lastRevision,
        note.lastRevision.toString(),
      );
    }

    return dontFilter;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      console.log(notes);
      if (notes.length > 0) {
        const notesDataToRevise = [] as Array<CardData>;
        await Promise.all(
          notes
            .filter(noteNeedToBeRevised)
            .filter(filterData) // Filtro manual aqui
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
                  nextRevisionDate: '',
                });
              }
            }),
        );

        setNotesToRevise(notesDataToRevise);
      }
    };

    fetchNotes();
  }, [categories, notes, noteSubjects, searchQuery, filters]);

  const handleFilterChange = (
    key: 'category' | 'subjects' | 'creationDate' | 'lastRevision',
    value: string & string[] & rangeDataType,
  ) => {
    const newFiltersClone = cloneDeep(filters);
    newFiltersClone[key] = value;
    setFilters(newFiltersClone);
  };

  const hideFilterDialog = () => setFilterDialogOpenFunction({Home: false});

  const resetFilterDialog = () => {
    setFilters(DEFAULT_FILTER_STATE as filterState);
    hideFilterDialog();
  };

  return (
    <DefaultContainerView>
      <FlatList
        testID="home-list"
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
            subjects: subjectsData,
          } = item;

          return (
            <NoteListCard
              title={title}
              creationDate={creationDate}
              lastRevisionDate={lastRevisionDate}
              noteType={noteType}
              category={category}
              subjects={subjectsData}
            />
          );
        }}
        style={styles.flatList}
        ListEmptyComponent={() => <EmpytListMessage />}
      />
      <FloatingAddButton routeName="NewNote" />
      <Dialog
        actions={[
          {
            label: 'Limpar',
            buttonMode: 'outlined',
            buttonAction: () => resetFilterDialog(),
          },
          {
            label: 'Filtrar',
            buttonMode: 'contained',
            buttonAction: () => hideFilterDialog(),
          },
        ]}
        isVisible={openFilterDialog}
        hideDialog={() => hideFilterDialog()}
        title={'Adicionar filtros'}>
        <NotesFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          categories={categories}
          subjects={subjects}
        />
      </Dialog>
    </DefaultContainerView>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({database}: any) => {
    return {
      notes: database.get('notes').query(),
      categories: database.get('categories').query(),
      subjects: database.get('subjects').query(),
      noteSubjects: database.get('note_subjects').query(),
    };
  }),
)(Home);
