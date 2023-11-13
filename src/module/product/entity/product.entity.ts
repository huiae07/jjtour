import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from 'src/common';
import { Holiday } from './holiday.entity';
import { Account } from 'src/module/account/entity/account.entity';
import { HolidayWeek } from './holidayWeek.entity';
import { Reservation } from 'src/module/reservation/entity/reservation.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @Column({ name: 'account_id', nullable: false, type: Number })
  @Index()
  accountId: number;

  @Column({ nullable: false, type: String, length: 64 })
  name: string;

  @ManyToOne(() => Account, (account) => account.products)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(() => Holiday, (holiday) => holiday.product)
  holidays: Holiday[];

  @OneToMany(() => HolidayWeek, (holidayWeek) => holidayWeek.product)
  holidayWeeks: HolidayWeek[];

  @OneToMany(() => Reservation, (reservation) => reservation.product)
  reservations: Reservation[];
}
