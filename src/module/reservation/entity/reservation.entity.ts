import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity, ReservationStatus } from 'src/common';
import { Product } from 'src/module/product/entity/product.entity';
import { Account } from 'src/module/account/entity/account.entity';

@Entity({ name: 'reservation' })
export class Reservation extends BaseEntity {
  @Column({ name: 'account_id', nullable: false, type: Number })
  accountId: number;

  @Column({ name: 'product_id', nullable: false, type: Number })
  @Index()
  productId: number;

  @Column({ nullable: false, type: String, length: 32 })
  @Index()
  token: string;

  @Column({ nullable: false, type: Number })
  date: number;

  @Column({ nullable: false, type: 'enum', enum: ReservationStatus })
  status: ReservationStatus;

  @ManyToOne(() => Product, (product) => product.reservations)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Account, (account) => account.reservations)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
