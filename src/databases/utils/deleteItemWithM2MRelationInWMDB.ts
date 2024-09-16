import {Q} from '@nozbe/watermelondb';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import get from 'lodash/get';

import {database} from '..';

import deleteItemInWMDB from './deleteItemInWMDB';

export default async function deleteItemWithM2MRelationInWMDB(
  model: string,
  id: string,
  relationshipModel: string,
  relationshipField: string,
) {
  try {
    const itemUpdated = await deleteItemInWMDB(model, id);
    const itemUpdatedId = get(itemUpdated, 'id', '');

    await database.write(async () => {
      const actualRelationships = await database
        .get(relationshipModel)
        .query(Q.where(relationshipField, itemUpdatedId))
        .fetch();

      const prepareDeleteOldRelations = actualRelationships.map(relation =>
        relation.prepareDestroyPermanently(),
      );

      await database.batch(...prepareDeleteOldRelations);
    });

    return itemUpdated;
  } catch (error: any) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Erro',
      textBody: 'Algo de errado aconteceu na criação deste item!',
    });
    return {error: true, message: error.message} as any;
  }
}
