import {Model} from '@nozbe/watermelondb';
import {field, date} from '@nozbe/watermelondb/decorators';

export class CategoryModel extends Model {
  static table = 'categories';
  static associations = {
    notes: {type: 'has_many', foreignKey: 'category_id'},
  } as const;

  @field('name')
  name!: string;

  @field('icon')
  icon!: string;

  @field('color')
  color!: string;

  @date('created_at')
  createdAt!: number;
}

export interface CategoryModelType {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: number;
}
