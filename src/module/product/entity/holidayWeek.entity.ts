import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from 'src/common';
import { Product } from './product.entity';

@Entity({ name: 'holiday_week' })
export class HolidayWeek extends BaseEntity {
  @Column({ name: 'product_id', nullable: false, type: Number })
  @Index()
  productId: number;

  @Column({ nullable: false, type: Number })
  week: number;

  @ManyToOne(() => Product, (product) => product.holidays)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
