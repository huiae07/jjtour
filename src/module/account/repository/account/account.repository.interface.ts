import { Account } from '../../entity/account.entity';
import { AccountCreateDao } from '../../dao/account.dao';

export const AccountRepositoryInterfaceToken = Symbol(
  'AccountRepositoryInterface',
);

export interface AccountRepositoryInterface {
  findOneById(id: number): Promise<Account | null>;
  findOneByEmail(email: string): Promise<Account | null>;
  create(createDao: AccountCreateDao[]): Promise<Account[]>;
}
