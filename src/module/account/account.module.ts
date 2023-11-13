import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountRepositoryModule } from './repository/account.repository.module';

@Module({
  imports: [AccountRepositoryModule],
  controllers: [],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
