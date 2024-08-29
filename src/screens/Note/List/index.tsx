/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {Text, SectionList, SectionListData, View} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {Q} from '@nozbe/watermelondb';
import {compose} from 'recompose';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import NoteListCard from '../../../components/NoteListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';
import Dialog from '../../../components/Dialog';
import Select from '../../../components/Select';
import SelectMultiple from '../../../components/SelectMultiple';
import DataRangeInput from '../../../components/DataRangeInput';
import {rangeDataType} from '../../../components/DataRangeInput/types';

import useGetFromGlobalState from '../../../hooks/useGetFromGlobalState';
import {NoteModelType} from '../../../databases/models/noteModel';
import NavigationService from '../../../navigation/NavigationService';
import noteNeedToBeRevised from '../../../utils/noteValidations';
import noteRevisionUpdate from '../../../utils/noteValidations/noteRevisionUpdate';
import filterActions from '../../../utils/filters';
import AppContext from '../../../context/appContext';
import {translateOptions} from '../Create';

import styles from './styles';
import {
  ListProps,
  CardData,
  sectionData,
  filterProps,
  filterState,
} from './types';

export const NotesFilter: React.FunctionComponent<filterProps> = ({
  filters,
  handleFilterChange,
  categories,
  subjects,
  dontShowCategory,
}) => {
  return (
    <View>
      {dontShowCategory ? null : (
        <Select
          options={translateOptions(categories)}
          onChange={value => handleFilterChange('category', value)}
          modalTitle="Selecione uma categoria"
          inputLabel="Selecionar Categoria"
          inputPlaceHolder="Selecionar Categoria"
          defaultValue={filters.category}
        />
      )}
      <SelectMultiple
        options={translateOptions(subjects as any)}
        onChange={value => handleFilterChange('subjects', value)}
        modalTitle="Selecione vários assuntos"
        inputPlaceHolder="Selecionar Assuntos"
        defaultValue={filters.subjects}
      />
      <DataRangeInput
        label={'Data de criação'}
        onChangeRange={date => handleFilterChange('creationDate', date)}
        defaultValue={filters.creationDate}
      />
      <DataRangeInput
        label={'Ultima revisão'}
        onChangeRange={date => handleFilterChange('lastRevision', date)}
        defaultValue={filters.lastRevision}
      />
      <DataRangeInput
        label={'Próxima revisão'}
        onChangeRange={date => handleFilterChange('nextRevision', date)}
        defaultValue={filters.nextRevision}
      />
    </View>
  );
};

export const DEFAULT_FILTER_STATE = {
  category: '',
  subjects: [],
  creationDate: {init: null, end: null},
  lastRevision: {init: null, end: null},
  nextRevision: {init: null, end: null},
};

const List: React.FunctionComponent<ListProps | any> = ({
  route,
  notes,
  category,
  noteSubjects,
  categories,
  subjects,
}) => {
  const {setFilterDialogOpenFunction} = useContext(AppContext);
  const searchQuery = useGetFromGlobalState('searchParams.Notes', '');
  const openFilterDialog = useGetFromGlobalState(
    'filterDialogOpen.Notes',
    false,
  ) as boolean;

  const [noteBySections, setNoteBySections] = useState(
    [] as SectionListData<any, sectionData>[],
  );
  const [filters, setFilters] = useState(DEFAULT_FILTER_STATE as filterState);

  const filterData = (note: NoteModelType) => {
    const {
      creationDate,
      lastRevision,
      nextRevision,
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

    if ((nextRevision.init || nextRevision.end) && dontFilter) {
      dontFilter = filterActions.rangeInputDateVerify(
        nextRevision,
        note.nextRevision.toString(),
      );
    }

    return dontFilter;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (notes.length > 0) {
        const newNoteBySections = [];
        const otherSection = {
          title: 'Demais anotações',
          data: [] as Array<CardData>,
        };
        const revisionSection = {
          title: 'Anotações a serem revisadas',
          data: [] as Array<CardData>,
        };
        await Promise.all(
          notes.filter(filterData).map(async (note: NoteModelType) => {
            const categoryName = get(category, 'name', '');
            const subjectsFetch = await note.subjects.fetch();
            const needRevision = noteNeedToBeRevised(note);
            if (note.name.includes(searchQuery)) {
              (needRevision ? revisionSection : otherSection).data.push({
                id: note.id,
                title: note.name,
                creationDate: new Date(note.createdAt).toLocaleDateString(
                  'pt-BR',
                ),
                lastRevisionDate: new Date(
                  note.lastRevision,
                ).toLocaleDateString('pt-BR'),
                nextRevisionDate: new Date(
                  note.nextRevision,
                ).toLocaleDateString('pt-BR'),
                noteType: 'Texto',
                category: categoryName,
                subjects: (subjectsFetch || []).map(({name, color}: any) => ({
                  content: name,
                  color,
                })),
                levelRevision: note.levelRevision,
                needRevision: needRevision,
              });
            }
          }),
        );

        if (revisionSection.data.length > 0) {
          newNoteBySections.push(revisionSection);
        }
        if (otherSection.data.length > 0) {
          newNoteBySections.push(otherSection);
        }

        setNoteBySections(newNoteBySections);
      }
    };

    fetchNotes();
  }, [category, notes, noteSubjects, searchQuery, filters]);

  const handleFilterChange = (
    key:
      | 'category'
      | 'subjects'
      | 'creationDate'
      | 'lastRevision'
      | 'nextRevision',
    value: string & string[] & rangeDataType,
  ) => {
    const newFiltersClone = cloneDeep(filters);
    newFiltersClone[key] = value;
    setFilters(newFiltersClone);
  };

  const hideFilterDialog = () => setFilterDialogOpenFunction({Notes: false});

  const resetFilterDialog = () => {
    setFilters(DEFAULT_FILTER_STATE as filterState);
    hideFilterDialog();
  };

  if (notes.length <= 0) {
    return (
      <EmpytMessage
        message={'Nenhuma anotação criada para esta categoria'}
        actionLabel={'Crie uma anotação'}
        onPressAction={() =>
          NavigationService.navigate('NewNote', {
            categoryId: get(route, 'params.categoryId', ''),
          })
        }
      />
    );
  }

  return (
    <>
      <SectionList
        sections={noteBySections}
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NoteListCard
            title={item.title}
            creationDate={item.creationDate}
            lastRevisionDate={item.lastRevisionDate}
            nextRevisionDate={item.nextRevisionDate}
            noteType={item.noteType}
            category={item.category}
            subjects={item.subjects}
            containerStyle={styles.cardCustomStyle}
            onPress={() => {
              noteRevisionUpdate(
                item.id,
                item.levelRevision,
                item.creationDate,
                item.needRevision,
              );
              NavigationService.navigate('ShowNote', {
                noteName: item.title,
                noteId: item.id,
              });
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) =>
          title ? <Text style={styles.listHeader}>{title}</Text> : null
        }
        style={styles.sectionList}
      />
      <FloatingAddButton
        routeName="NewNote"
        params={{categoryId: get(route, 'params.categoryId', '')}}
      />
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
          dontShowCategory
        />
      </Dialog>
    </>
  );
};

export default compose(
  withDatabase,
  withObservables(['route'], ({database, route}: any) => {
    const categoryId = get(route, 'params.categoryId', '');
    return {
      category: database.get('categories').findAndObserve(categoryId),
      notes: database
        .get('notes')
        .query(Q.where('category_id', categoryId))
        .observeWithColumns(['name', 'category_id']),
      noteSubjects: database
        .get('note_subjects')
        .query()
        .observeWithColumns(['note_id', 'subject_id']),
      categories: database.get('categories').query(),
      subjects: database.get('subjects').query(),
    };
  }),
)(List);
