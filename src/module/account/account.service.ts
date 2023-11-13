import { Inject, Injectable } from '@nestjs/common';
import { Account } from './entity/account.entity';
import {
  AccountRepositoryInterface,
  AccountRepositoryInterfaceToken,
} from './repository/account/account.repository.interface';
import { AccountCreateDao } from './dao/account.dao';

@Injectable()
export class AccountService {
  constructor(
    @Inject(AccountRepositoryInterfaceToken)
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  async findOneByEmail(email: string): Promise<Account | undefined> {
    return this.accountRepository.findOneByEmail(email);
  }

  async findOneById(id: number): Promise<Account | undefined> {
    return this.accountRepository.findOneById(id);
  }

  async createAccountOne(createAccount: AccountCreateDao): Promise<Account> {
    const [account] = await this.accountRepository.create([createAccount]);
    return account;
  }
}
