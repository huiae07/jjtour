import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountModule } from './module/account/account.module';
import { AuthModule } from './module/auth/auth.module';
import { DatabaseModule } from './module/database/database.module';
import { RedisModule } from './module/redis/redis.module';
import { ProductModule } from './module/product/product.module';
import { ReservationModule } from './module/reservation/reservation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AccountModule,
    AuthModule,
    RedisModule,
    ProductModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
