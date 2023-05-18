import get from 'lodash/get';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

import insertItemInWMDB, {Relationship, Data} from './insertItemInWMDB';

export default async function insertItemWithM2MRelationInWMDB(
  model: string,
  data: Data,
  relationshipModel: string,
  relationships: Array<Relationship>,
  relationshipeKey: string,
) {
  try {
    const itemCreated = await insertItemInWMDB(model, data);

    relationships.map(async ({type: RelationshipType, id: RelationshipId}) => {
      await insertItemInWMDB(relationshipModel, {
        relationships: [
          {type: relationshipeKey, id: get(itemCreated, 'id', '')},
          {type: RelationshipType, id: RelationshipId},
        ],
      });
    });

    return itemCreated;
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
