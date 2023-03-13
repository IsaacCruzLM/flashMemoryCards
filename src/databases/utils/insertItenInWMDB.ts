import {snakeCase} from 'snake-case';
import {database} from '..';

export default async function insertItenInWMDB(model: string, data: Object) {
  const modelInSnakeCase = snakeCase(model);
  const newItem = await database.write(async () => {
    const itemCreated = await database
      .get(modelInSnakeCase)
      .create(wmdbModel => {
        const dataKeys = Object.keys(data);
        dataKeys.map((key: string) => {
          (wmdbModel as any)[key] = (data as any)[key];
        });
      });
    return itemCreated;
  });
  return newItem;
}
