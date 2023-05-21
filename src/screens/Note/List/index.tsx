import React, {useEffect, useState} from 'react';
import {Text, SectionList, SectionListData} from 'react-native';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {Q} from '@nozbe/watermelondb';
import {compose} from 'recompose';
import get from 'lodash/get';

import NoteListCard from '../../../components/NoteListCard';
import FloatingAddButton from '../../../components/FloatingAddButton';

import styles from './styles';
import {ListProps, CardData, sectionData} from './types';
import {NoteModelType} from '../../../databases/models/noteModel';

const List: React.FunctionComponent<ListProps | any> = ({
  route,
  notes,
  category,
}) => {
  const [noteBySections, setNoteBySections] = useState(
    [] as SectionListData<any, sectionData>[],
  );

  useEffect(() => {
    const fetchNotes = async () => {
      if (notes.length > 0) {
        const defaultSection = {
          title: 'Demais Anotações',
          data: [] as Array<CardData>,
        };
        await Promise.all(
          notes.map(async (note: NoteModelType) => {
            const categoryName = get(category, 'name', '');
            const subjects = await note.subjects.fetch();
            defaultSection.data.push({
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
        setNoteBySections([defaultSection]);
      }
    };

    fetchNotes();
  }, [category, notes]);

  return (
    <>
      <SectionList
        sections={noteBySections}
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

export default compose(
  withDatabase,
  withObservables(['route'], ({database, route}: any) => {
    const categoryId = get(route, 'params.categoryId', '');
    return {
      category: database.get('categories').findAndObserve(categoryId),
      notes: database.get('notes').query(Q.where('category_id', categoryId)),
    };
  }),
)(List);
