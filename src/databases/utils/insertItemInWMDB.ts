import Model from '@nozbe/watermelondb/Model';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function insertItemInWMDB(model: string, data: Data) {
  try {
    const modelInSnakeCase = snakeCase(model);
    const newItem = await database.write(async () => {
      const {relationships = [], ...restOfData} = data;

      const itemCreated = await database
        .get(modelInSnakeCase)
        .create(wmdbModel => {
          const dataKeys = Object.keys(restOfData);
          dataKeys.map((key: string) => {
            (wmdbModel as Model | any)[key] = (restOfData as Object | any)[key];
          });
          relationships.map(({type, id}: Relationship) => {
            (wmdbModel as Model | any)[type].id = id;
          });
        });

      return itemCreated;
    });
    return newItem;
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

export interface Relationship {
  type: string;
  id: string;
  [x: string]: string;
}

export interface Data {
  relationships?: Array<Relationship>;
  [x: string]: any;
}
