import { ReservationCreateDao } from '../../dao/reservation.dao';
import { Reservation } from '../../entity/reservation.entity';

export const ReservationRepositoryInterfaceToken = Symbol(
  'ReservationRepositoryInterface',
);

export interface ReservationRepositoryInterface {
  findByAccountId(accountId: number): Promise<Reservation[]>;
  findById(id: number): Promise<Reservation | null>;
  findByToken(token: string): Promise<Reservation | null>;
  findCountForReservation(productId: number, date: number): Promise<number>;
  create(createDao: ReservationCreateDao[]): Promise<Reservation[]>;
  approve(id: number): Promise<void>;
  reject(id: number): Promise<void>;
  cancel(id: number): Promise<void>;
}
