import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { HolidayWeekRepositoryInterface } from './holidayWeek.repository.interface';
import { HolidayWeek } from '../../entity/holidayWeek.entity';
import { ProductHolidayWeekCreateDao } from '../../dao/product.dao';
import { Product } from '../../entity/product.entity';

export class HolidayWeekRepository implements HolidayWeekRepositoryInterface {
  constructor(
    @InjectRepository(HolidayWeek)
    protected repository: Repository<HolidayWeek>,
  ) {}
  protected readonly logger = new Logger(HolidayWeekRepository.name);

  async create(
    createDao: ProductHolidayWeekCreateDao[],
  ): Promise<HolidayWeek[]> {
    return this.repository.save(this.repository.create(createDao));
  }

  async createForProduct(product: Product, weeks: number[]): Promise<void> {
    const holidayWeeks = product.holidayWeeks.map(
      (holidayWeek) => holidayWeek.week,
    );
    const createHolidayWeekDaoList = [];
    weeks.forEach((week) => {
      if (!holidayWeeks.includes(week)) {
        createHolidayWeekDaoList.push({
          productId: product.id,
          week,
        });
      }
    });
    await this.create(createHolidayWeekDaoList);
  }

  async deleteByIds(ids: number[]): Promise<void> {
    await this.repository.delete(ids);
  }

  async deleteForProduct(product: Product, weeks: number[]): Promise<void> {
    const deleteHolidayWeekIds = [];
    product.holidayWeeks.forEach((holidayWeek) => {
      if (weeks.includes(holidayWeek.week)) {
        deleteHolidayWeekIds.push(holidayWeek.id);
      }
    });
    await this.deleteByIds(deleteHolidayWeekIds);
  }
}
