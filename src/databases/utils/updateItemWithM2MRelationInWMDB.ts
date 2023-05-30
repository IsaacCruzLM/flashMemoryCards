import get from 'lodash/get';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {database} from '..';

import insertItemInWMDB, {Relationship, Data} from './insertItemInWMDB';
import updateItemInWMDB from './updateItemInWMDB';

export default async function insertItemWithM2MRelationInWMDB(
  model: string,
  data: Data,
  id: string,
  // relationshipModel: string,
  // relationships: Array<Relationship>,
  // relationshipeKey: string,
) {
  try {
    const itemUpdated = await updateItemInWMDB(model, data, id);

    // Get all relations

    // Verify if have a relation that not exists anymore and delete him

    // Create new relations

    // If exists, dont do anything

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
