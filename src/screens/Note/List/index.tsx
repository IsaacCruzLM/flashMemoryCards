import React, {useEffect, useState} from 'react';
import {Text, SectionList, SectionListData} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {Q} from '@nozbe/watermelondb';
import {compose} from 'recompose';
import get from 'lodash/get';

import NoteListCard from '../../../components/NoteListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';
import EmpytMessage from '../../../components/EmpytMessage';

import {NoteModelType} from '../../../databases/models/noteModel';
import NavigationService from '../../../navigation/NavigationService';
import noteNeedToBeRevised from '../../../utils/noteValidations';

import styles from './styles';
import {ListProps, CardData, sectionData} from './types';

const List: React.FunctionComponent<ListProps | any> = ({
  route,
  notes,
  category,
  noteSubjects,
}) => {
  const [noteBySections, setNoteBySections] = useState(
    [] as SectionListData<any, sectionData>[],
  );

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
          notes.map(async (note: NoteModelType) => {
            const categoryName = get(category, 'name', '');
            const subjects = await note.subjects.fetch();
            const needRevision = noteNeedToBeRevised(note);

            (needRevision ? revisionSection : otherSection).data.push({
              id: note.id,
              title: note.name,
              creationDate: new Date(note.createdAt).toLocaleDateString(
                'pt-BR',
              ),
              lastRevisionDate: new Date(note.lastRevision).toLocaleDateString(
                'pt-BR',
              ),
              noteType: 'Texto',
              category: categoryName,
              subjects: (subjects || []).map(({name, color}: any) => ({
                content: name,
                color,
              })),
            });
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
  }, [category, notes, noteSubjects]);

  if (noteBySections.length <= 0) {
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
            noteType={item.noteType}
            category={item.category}
            subjects={item.subjects}
            containerStyle={styles.cardCustomStyle}
            onPress={() =>
              NavigationService.navigate('ShowNote', {
                noteName: item.title,
                noteId: item.id,
              })
            }
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
    };
  }),
)(List);
