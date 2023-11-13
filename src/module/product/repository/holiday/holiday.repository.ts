import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { HolidayRepositoryInterface } from './holiday.repository.interface';
import { Holiday } from '../../entity/holiday.entity';
import { ProductHolidayCreateDao } from '../../dao/product.dao';
import { Product } from '../../entity/product.entity';

export class HolidayRepository implements HolidayRepositoryInterface {
  constructor(
    @InjectRepository(Holiday) protected repository: Repository<Holiday>,
  ) {}
  protected readonly logger = new Logger(HolidayRepository.name);

  async create(createDao: ProductHolidayCreateDao[]): Promise<Holiday[]> {
    return this.repository.save(this.repository.create(createDao));
  }

  async createForProduct(product: Product, dates: number[]): Promise<void> {
    const holidayDates = product.holidays.map((holiday) => holiday.date);
    const createHolidayDaoList = [];
    dates.forEach((date) => {
      if (!holidayDates.includes(date)) {
        createHolidayDaoList.push({
          productId: product.id,
          date,
        });
      }
    });
    await this.create(createHolidayDaoList);
  }

  async deleteByIds(ids: number[]): Promise<void> {
    await this.repository.delete(ids);
  }

  async deleteForProduct(product: Product, dates: number[]): Promise<void> {
    const deleteHolidayIds = [];
    product.holidays.forEach((holiday) => {
      if (dates.includes(holiday.date)) {
        deleteHolidayIds.push(holiday.id);
      }
    });
    await this.deleteByIds(deleteHolidayIds);
  }
}
