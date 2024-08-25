import Model from '@nozbe/watermelondb/Model';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function deleteItemInWMDB(model: string, id: string) {
  try {
    const modelInSnakeCase = snakeCase(model);
    const deletedItem = await database.write(async () => {
      const item: Model = await database.get(modelInSnakeCase).find(id);
      console.log('Flag 12', item);
      if (!item) {
        throw Error('Item não encontrado!');
      } else {
        await (item as Model).destroyPermanently();
      }
      return item;
    });
    return deletedItem;
  } catch (error: any) {
    console.log('Flag 2', error);
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Erro',
      textBody: 'Algo de errado aconteceu na edição deste item!',
    });
    return {error: true, message: error.message};
  }
}
