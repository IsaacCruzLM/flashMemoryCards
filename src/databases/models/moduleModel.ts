import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export class ModuleModel extends Model {
  static table = 'modules';

  @field('name')
  name!: string;
}
