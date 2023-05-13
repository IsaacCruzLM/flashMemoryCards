import {get} from 'lodash';

import insertItemInWMDB from './insertItemInWMDB';

export default async function insertItemWitmM2MRelationInWMDB(
  model: string,
  data: Object,
  relationshipModel: string,
  relationships: Array<object>,
  relationshipeKey: string,
) {
  const itemCreated = await insertItemInWMDB(model, data);

  relationships.map(async relationshipData => {
    await insertItemInWMDB(relationshipModel, {
      [relationshipeKey]: get(itemCreated, 'id', ''),
      ...relationshipData,
    });
  });

  return itemCreated;
}
