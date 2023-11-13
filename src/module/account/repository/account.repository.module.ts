import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountRepositoryInterfaceToken } from './account/account.repository.interface';
import { Account } from '../entity/account.entity';
import { AccountRepository } from './account/account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [
    {
      provide: AccountRepositoryInterfaceToken,
      useClass: AccountRepository,
    },
  ],
  exports: [AccountRepositoryInterfaceToken],
})
export class AccountRepositoryModule {}
