import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservationRepositoryInterfaceToken } from './reservation/reservation.repository.interface';
import { ReservationRepository } from './reservation/reservation.repository';
import { Reservation } from '../entity/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [
    {
      provide: ReservationRepositoryInterfaceToken,
      useClass: ReservationRepository,
    },
  ],
  exports: [ReservationRepositoryInterfaceToken],
})
export class ReservationRepositoryModule {}
