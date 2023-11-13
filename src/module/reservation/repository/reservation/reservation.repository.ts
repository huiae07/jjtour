import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ReservationRepositoryInterface } from './reservation.repository.interface';
import { Reservation } from '../../entity/reservation.entity';
import { ReservationCreateDao } from '../../dao/reservation.dao';
import { ReservationStatus } from 'src/common';

export class ReservationRepository implements ReservationRepositoryInterface {
  constructor(
    @InjectRepository(Reservation)
    protected repository: Repository<Reservation>,
  ) {}
  protected readonly logger = new Logger(ReservationRepository.name);

  async findByAccountId(accountId: number): Promise<Reservation[]> {
    return this.repository.find({
      where: {
        accountId,
      },
      relations: {
        product: true,
      },
    });
  }

  async findById(id: number): Promise<Reservation | null> {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: {
        product: true,
      },
    });
  }

  async findByToken(token: string): Promise<Reservation> {
    return this.repository.findOne({
      where: { token },
      relations: {
        product: true,
      },
    });
  }

  async findCountForReservation(
    productId: number,
    date: number,
  ): Promise<number> {
    return this.repository.count({
      where: { productId, date },
    });
  }

  async create(createDao: ReservationCreateDao[]): Promise<Reservation[]> {
    return this.repository.save(this.repository.create(createDao));
  }

  async approve(id: number): Promise<void> {
    await this.repository.update(id, {
      status: ReservationStatus.APPROVED,
    });
  }

  async reject(id: number): Promise<void> {
    await this.repository.update(id, {
      status: ReservationStatus.REJECTED,
    });
  }

  async cancel(id: number): Promise<void> {
    await this.repository.update(id, {
      status: ReservationStatus.CANCELED,
    });
  }
}
