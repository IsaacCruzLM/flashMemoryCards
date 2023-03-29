import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class ModuleModel extends Model {
  static table = 'modules';
  static associations = {
    notes: {type: 'has_many', foreignKey: 'module_id'},
  } as const;

  @field('name')
  name!: string;

  @field('icon')
  icon!: string;

  @field('color')
  color!: string;
}
