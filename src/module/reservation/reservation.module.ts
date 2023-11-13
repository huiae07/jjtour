import { Module } from '@nestjs/common';
import { ReservationSellerController } from './reservation.seller.controller';
import { ReservationService } from './reservation.service';
import { ReservationRepositoryModule } from './repository/reservation.repository.module';
import { ReservationCustomerController } from './reservation.customer.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule, ReservationRepositoryModule],
  controllers: [ReservationSellerController, ReservationCustomerController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {}
