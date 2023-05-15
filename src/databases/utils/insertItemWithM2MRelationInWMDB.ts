import get from 'lodash/get';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

import insertItemInWMDB from './insertItemInWMDB';

export default async function insertItemWithM2MRelationInWMDB(
  model: string,
  data: Object,
  relationshipModel: string,
  relationships: Array<object>,
  relationshipeKey: string,
) {
  try {
    const itemCreated = await insertItemInWMDB(model, data);

    // relationships.map(async relationshipData => {
    //   await insertItemInWMDB(relationshipModel, {
    //     [relationshipeKey]: get(itemCreated, 'id', ''),
    //     ...relationshipData,
    //   });
    // });

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
