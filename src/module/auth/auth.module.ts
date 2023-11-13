import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtUserStrategy } from './strategy/jwt.user.strategy';

@Module({
  imports: [AccountModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtUserStrategy],
})
export class AuthModule {}
