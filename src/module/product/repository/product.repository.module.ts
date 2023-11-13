import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRepositoryInterfaceToken } from './product/product.repository.interface';
import { Product } from '../entity/product.entity';
import { Holiday } from '../entity/holiday.entity';
import { HolidayWeek } from '../entity/holidayWeek.entity';
import { ProductRepository } from './product/product.repository';
import { HolidayRepositoryInterfaceToken } from './holiday/holiday.repository.interface';
import { HolidayRepository } from './holiday/holiday.repository';
import { HolidayWeekRepositoryInterfaceToken } from './holidayWeek/holidayWeek.repository.interface';
import { HolidayWeekRepository } from './holidayWeek/holidayWeek.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Holiday]),
    TypeOrmModule.forFeature([HolidayWeek]),
  ],
  providers: [
    {
      provide: ProductRepositoryInterfaceToken,
      useClass: ProductRepository,
    },
    {
      provide: HolidayRepositoryInterfaceToken,
      useClass: HolidayRepository,
    },
    {
      provide: HolidayWeekRepositoryInterfaceToken,
      useClass: HolidayWeekRepository,
    },
  ],
  exports: [
    ProductRepositoryInterfaceToken,
    HolidayRepositoryInterfaceToken,
    HolidayWeekRepositoryInterfaceToken,
  ],
})
export class ProductRepositoryModule {}
