import Model from '@nozbe/watermelondb/Model';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function updateItemInWMDB(
  model: string,
  data: Object,
  id: string,
) {
  try {
    const modelInSnakeCase = snakeCase(model);
    const newItem = await database.write(async () => {
      const item = await database.get(modelInSnakeCase).find(id);
      if (!item) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erro',
          textBody: 'Item não encontrado!',
        });
      }
      const itemUptaded = await item.update(wmdbModel => {
        const dataKeys = Object.keys(data);
        dataKeys.map((key: string) => {
          (wmdbModel as Model | any)[key] = (data as Object | any)[key];
        });
      });
      return itemUptaded;
    });
    return newItem;
  } catch (error: any) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Erro',
      textBody: 'Algo de errado aconteceu na edição deste item!',
    });
    return {error: true, message: error.message};
  }
}
