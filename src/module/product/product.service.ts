import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../account/entity/account.entity';
import {
  ProductRepositoryInterface,
  ProductRepositoryInterfaceToken,
} from './repository/product/product.repository.interface';
import { Transactional } from 'typeorm-transactional';
import {
  HolidayRepositoryInterface,
  HolidayRepositoryInterfaceToken,
} from './repository/holiday/holiday.repository.interface';
import {
  HolidayWeekRepositoryInterface,
  HolidayWeekRepositoryInterfaceToken,
} from './repository/holidayWeek/holidayWeek.repository.interface';
import {
  DeleteProductHolidayBodyDto,
  PostProductBodyDto,
  PostProductHolidayBodyDto,
} from './dto/product.dto';
import { RedisService } from '../redis/redis.service';
import { Product } from './entity/product.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepositoryInterfaceToken)
    private readonly productRepository: ProductRepositoryInterface,
    @Inject(HolidayRepositoryInterfaceToken)
    private readonly holidayRepository: HolidayRepositoryInterface,
    @Inject(HolidayWeekRepositoryInterfaceToken)
    private readonly holidayWeekRepository: HolidayWeekRepositoryInterface,
    private readonly redisService: RedisService,
  ) {}

  @Transactional()
  async createProduct(
    account: Account,
    postProductBodyDto: PostProductBodyDto,
  ) {
    await this.productRepository.create([
      {
        accountId: account.id,
        name: postProductBodyDto.name,
      },
    ]);
  }

  @Transactional()
  async createProductHoliday(
    account: Account,
    productId: number,
    { weeks, dates }: PostProductHolidayBodyDto,
  ) {
    const product = await this.productRepository.findOneForSeller(
      account.id,
      productId,
    );
    if (!product) {
      throw new NotFoundException();
    }
    if (weeks) {
      await this.holidayWeekRepository.createForProduct(product, weeks);
    }
    if (dates) {
      await this.holidayRepository.createForProduct(product, dates);
    }
    await this.setReservationAvaliableDates(productId);
  }

  @Transactional()
  async deleteProductHoliday(
    account: Account,
    productId: number,
    { weeks, dates }: DeleteProductHolidayBodyDto,
  ) {
    const product = await this.productRepository.findOneForSeller(
      account.id,
      productId,
    );
    if (!product) {
      throw new NotFoundException();
    }

    if (weeks) {
      await this.holidayWeekRepository.deleteForProduct(product, weeks);
    }
    if (dates) {
      await this.holidayRepository.deleteForProduct(product, dates);
    }
    await this.setReservationAvaliableDates(productId);
  }

  async getProductsForSeller(account: Account) {
    const products = await this.productRepository.findByAccountId(account.id);
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        createdAt: product.createdAt,
        holidays: product.holidays.map((holiday) => holiday.date),
        holidayWeeks: product.holidayWeeks.map(
          (holidayWeek) => holidayWeek.week,
        ),
      })),
    };
  }

  async getProductsForCustomer() {
    const products = await this.productRepository.find();
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        createdAt: product.createdAt,
      })),
    };
  }

  async getProductForCustomer(productId: number) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundException();
    }
    const reservationDates: number[] =
      (await this.redisService.get<number[] | null>(product.id.toString())) ||
      (await this.setReservationAvaliableDates(product.id));

    return {
      id: product.id,
      name: product.name,
      createdAt: product.createdAt,
      reservationDates,
    };
  }

  async setReservationAvaliableDates(productId: number) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return;
    }
    const dates = this.getReservationAvaliableDates(product);
    await this.redisService.set(productId.toString(), dates);
    return dates;
  }

  getReservationAvaliableDates(product: Product) {
    const reservationAvaliableDates: number[] = [];
    let date = moment();
    const maxDate = moment().add(1, 'months');
    const holidayDates = product.holidays.map((holiday) => holiday.date);
    const holidayWeeks = product.holidayWeeks.map(
      (holidayWeek) => holidayWeek.week,
    );
    while (date < maxDate) {
      date = date.add(1, 'days');
      const targetDate = Number(date.format('YYYYMMDD'));
      if (
        holidayWeeks.includes(date.day()) ||
        holidayDates.includes(targetDate)
      ) {
        continue;
      }
      reservationAvaliableDates.push(targetDate);
    }
    return reservationAvaliableDates;
  }

  async findById(id: number) {
    return this.productRepository.findById(id);
  }
}
