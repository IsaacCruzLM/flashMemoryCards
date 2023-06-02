import {Q} from '@nozbe/watermelondb';
import Model from '@nozbe/watermelondb/Model';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import get from 'lodash/get';

import {database} from '..';

import {Relationship, Data} from './insertItemInWMDB';
import updateItemInWMDB from './updateItemInWMDB';

export default async function updateItemWithM2MRelationInWMDB(
  model: string,
  data: Data,
  id: string,
  relationshipModel: string,
  newRelationships: Array<Relationship>,
  relationshipField: string,
  relationshipKey: string,
) {
  try {
    const itemUpdated = await updateItemInWMDB(model, data, id);
    const itemUpdatedId = get(itemUpdated, 'id', '');

    await database.write(async () => {
      const actualRelationships = await database
        .get(relationshipModel)
        .query(Q.where(relationshipField, itemUpdatedId))
        .fetch();

      const prepareDeleteOldRelations = actualRelationships.map(relation =>
        relation.prepareDestroyPermanently(),
      );

      const prepateCreateNewRelations = newRelationships.map(
        ({type, id: relationshipId}) =>
          database.get(relationshipModel).prepareCreate(wmdbModel => {
            (wmdbModel as Model | any)[relationshipKey].id = itemUpdatedId;
            (wmdbModel as Model | any)[type].id = relationshipId;
          }),
      );

      await database.batch(
        ...prepareDeleteOldRelations,
        ...prepateCreateNewRelations,
      );
    });

    return itemUpdated;
  } catch (error: any) {
    console.log('Flag Error', error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Erro',
      textBody: 'Algo de errado aconteceu na criação deste item!',
    });
    return {error: true, message: error.message};
  }
}
