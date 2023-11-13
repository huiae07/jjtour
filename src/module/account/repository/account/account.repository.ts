import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepositoryInterface } from './account.repository.interface';
import { Account } from '../../entity/account.entity';
import { AccountCreateDao } from '../../dao/account.dao';

export class AccountRepository implements AccountRepositoryInterface {
  constructor(
    @InjectRepository(Account) protected repository: Repository<Account>,
  ) {}
  protected readonly logger = new Logger(AccountRepository.name);

  async findOneById(id: number): Promise<Account | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<Account | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async create(createDao: AccountCreateDao[]): Promise<Account[]> {
    return this.repository.save(this.repository.create(createDao));
  }
}
