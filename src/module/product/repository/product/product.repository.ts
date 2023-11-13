import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductRepositoryInterface } from './product.repository.interface';
import { Product } from '../../entity/product.entity';
import { ProductCreateDao } from '../../dao/product.dao';

export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @InjectRepository(Product) protected repository: Repository<Product>,
  ) {}
  protected readonly logger = new Logger(ProductRepository.name);

  async findOneForSeller(
    accountId: number,
    id: number,
  ): Promise<Product | null> {
    return this.repository.findOne({
      relations: {
        holidayWeeks: true,
        holidays: true,
      },
      where: {
        accountId,
        id,
      },
    });
  }

  async find(): Promise<Product[]> {
    return this.repository.find({
      relations: {
        holidayWeeks: true,
        holidays: true,
      },
    });
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        holidayWeeks: true,
        holidays: true,
      },
    });
  }

  async findByAccountId(accountId: number): Promise<Product[]> {
    return this.repository.find({
      relations: {
        holidayWeeks: true,
        holidays: true,
      },
      where: { accountId },
    });
  }

  async create(createDao: ProductCreateDao[]): Promise<Product[]> {
    return this.repository.save(this.repository.create(createDao));
  }
}
