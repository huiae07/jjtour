import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Account } from '../account/entity/account.entity';
import {
  ReservationRepositoryInterface,
  ReservationRepositoryInterfaceToken,
} from './repository/reservation/reservation.repository.interface';
import { Transactional } from 'typeorm-transactional';
import { Reservation } from './entity/reservation.entity';
import * as moment from 'moment-timezone';
import { ReservationStatus, uuid } from 'src/common';
import { PostReservationBodyDto } from './dto/reservation.dto';
import { ProductService } from '../product/product.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(ReservationRepositoryInterfaceToken)
    private readonly reservationRepository: ReservationRepositoryInterface,
    private readonly productService: ProductService,
    private readonly redisService: RedisService,
  ) {}

  @Transactional()
  async createReservation({ productId, date }: PostReservationBodyDto) {
    const product = await this.productService.findById(productId);
    if (!product) {
      throw new NotFoundException();
    }
    const reservationDates =
      (await this.redisService.get<number[] | null>(product.id.toString())) ||
      this.productService.getReservationAvaliableDates(product);
    if (
      !reservationDates.includes(date) ||
      Number(moment().format('YYYYMMDD')) > date
    ) {
      throw new BadRequestException();
    }

    const token = uuid();
    const reservationCount =
      await this.reservationRepository.findCountForReservation(productId, date);

    await this.reservationRepository.create([
      {
        accountId: product.accountId,
        productId: productId,
        token,
        status:
          reservationCount < 5
            ? ReservationStatus.APPROVED
            : ReservationStatus.PENDING,
        date,
      },
    ]);
    return {
      token,
    };
  }

  @Transactional()
  async cancelReservationByToken(token: string) {
    const reservation = await this.reservationRepository.findByToken(token);
    if (this.validateCancelResevation(reservation)) {
      throw new BadRequestException();
    }
    await this.reservationRepository.cancel(reservation.id);
  }

  validateCancelResevation(reservation?: Reservation) {
    if (!reservation) {
      throw new NotFoundException();
    }
    if (reservation.status === ReservationStatus.PENDING) {
      return false;
    } else if (reservation.status === ReservationStatus.APPROVED) {
      if (moment(reservation.date, 'YYYYMMDD').diff(moment(), 'days') >= 2) {
        return false;
      }
    }
    return true;
  }

  async getReservationByToken(token: string) {
    const reservation = await this.reservationRepository.findByToken(token);
    if (!reservation) {
      throw new NotFoundException();
    }
    return {
      token: reservation.token,
      date: reservation.date,
      createdAt: reservation.createdAt,
      status: reservation.status,
      productName: reservation.product.name,
    };
  }

  @Transactional()
  async approveReservation(account: Account, reservationId: number) {
    const reservation = await this.reservationRepository.findById(
      reservationId,
    );
    if (this.validateApproveResevation(account, reservation)) {
      throw new BadRequestException();
    }
    await this.reservationRepository.approve(reservation.id);
  }

  @Transactional()
  async rejectReservation(account: Account, reservationId: number) {
    const reservation = await this.reservationRepository.findById(
      reservationId,
    );
    if (this.validateRejectResevation(account, reservation)) {
      throw new BadRequestException();
    }
    await this.reservationRepository.reject(reservation.id);
  }

  validateRejectResevation(account: Account, reservation?: Reservation) {
    if (!reservation) {
      throw new NotFoundException();
    }
    if (account.id !== reservation.accountId) {
      return true;
    }
    if (reservation.status === ReservationStatus.PENDING) {
      return false;
    } else if (reservation.status === ReservationStatus.APPROVED) {
      if (moment(reservation.date, 'YYYYMMDD').diff(moment(), 'days') > 0) {
        return false;
      }
    }
    return true;
  }

  validateApproveResevation(account: Account, reservation?: Reservation) {
    if (!reservation) {
      throw new NotFoundException();
    }
    if (account.id !== reservation.accountId) {
      return true;
    }
    if (reservation.status === ReservationStatus.PENDING) {
      if (moment(reservation.date, 'YYYYMMDD').diff(moment(), 'days') > 0) {
        return false;
      }
    }
    return true;
  }

  async getReservations(account: Account) {
    const reservations = await this.reservationRepository.findByAccountId(
      account.id,
    );

    return {
      reservations: reservations.map((reservation) => ({
        id: reservation.id,
        token: reservation.token,
        date: reservation.date,
        createdAt: reservation.createdAt,
        status: reservation.status,
        productName: reservation.product.name,
      })),
    };
  }
}
