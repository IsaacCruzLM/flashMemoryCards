import Model from '@nozbe/watermelondb/Model';
import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function insertItenInWMDB(model: string, data: Object) {
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
    return {error: true, message: error.message};
  }
}
