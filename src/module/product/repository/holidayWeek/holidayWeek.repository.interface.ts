import { ProductHolidayWeekCreateDao } from '../../dao/product.dao';
import { HolidayWeek } from '../../entity/holidayWeek.entity';
import { Product } from '../../entity/product.entity';

export const HolidayWeekRepositoryInterfaceToken = Symbol(
  'HolidayWeekRepositoryInterface',
);

export interface HolidayWeekRepositoryInterface {
  create(createDao: ProductHolidayWeekCreateDao[]): Promise<HolidayWeek[]>;
  createForProduct(product: Product, weeks: number[]): Promise<void>;
  deleteByIds(ids: number[]): Promise<void>;
  deleteForProduct(product: Product, weeks: number[]): Promise<void>;
}
