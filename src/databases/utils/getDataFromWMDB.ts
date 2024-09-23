import Model from '@nozbe/watermelondb/Model';
import {Clause} from '@nozbe/watermelondb/QueryDescription';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function getDataFromWMDB(model: string, query: Clause) {
  try {
    const modelInSnakeCase = snakeCase(model);
    const data = await database.read(async () => {
      const itens: Model[] | any[] = await database
        .get(modelInSnakeCase)
        .query(query)
        .fetch();

      return itens;
    });
    return data;
  } catch (error: any) {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Erro',
      textBody: 'Algo de errado aconteceu!',
    });
    return {error: true, message: error.message} as any;
  }
}
