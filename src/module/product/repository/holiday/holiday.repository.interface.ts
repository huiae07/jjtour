import { ProductHolidayCreateDao } from '../../dao/product.dao';
import { Holiday } from '../../entity/holiday.entity';
import { Product } from '../../entity/product.entity';

export const HolidayRepositoryInterfaceToken = Symbol(
  'HolidayRepositoryInterface',
);

export interface HolidayRepositoryInterface {
  create(createDao: ProductHolidayCreateDao[]): Promise<Holiday[]>;
  createForProduct(product: Product, dates: number[]): Promise<void>;
  deleteByIds(ids: number[]): Promise<void>;
  deleteForProduct(product: Product, weeks: number[]): Promise<void>;
}
