import { ReservationStatus } from 'src/common';

export interface ReservationCreateDao {
  accountId: number;
  productId: number;
  token: string;
  date: number;
  status: ReservationStatus;
}
