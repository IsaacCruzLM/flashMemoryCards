import Model from '@nozbe/watermelondb/Model';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function insertItemInWMDB(model: string, data: Object) {
  try {
    const modelInSnakeCase = snakeCase(model);
    const newItem = await database.write(async () => {
      const itemCreated = await database
        .get(modelInSnakeCase)
        .create(wmdbModel => {
          const dataKeys = Object.keys(data);
          dataKeys.map((key: string) => {
            (wmdbModel as Model | any)[key] = (data as Object | any)[key];
          });
        });
      return itemCreated;
    });
    return newItem;
  } catch (error: any) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Erro',
      textBody: 'Algo de errado aconteceu na criação deste item!',
    });
    return {error: true, message: error.message};
  }
}
