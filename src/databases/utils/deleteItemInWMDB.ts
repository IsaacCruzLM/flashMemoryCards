import Model from '@nozbe/watermelondb/Model';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function deleteItemInWMDB(model: string, id: string) {
  try {
    const modelInSnakeCase = snakeCase(model);
    const deletedItem = await database.write(async () => {
      const item: Model = await database.get(modelInSnakeCase).find(id);
      if (!item) {
        await (item as Model).destroyPermanently();
      } else {
        throw Error('Item não encontrado!');
      }
      return item;
    });
    return deletedItem;
  } catch (error: any) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Erro',
      textBody: 'Algo de errado aconteceu na edição deste item!',
    });
    return {error: true, message: error.message};
  }
}
