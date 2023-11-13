import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from 'src/common';
import { Product } from './product.entity';

@Entity({ name: 'holiday' })
export class Holiday extends BaseEntity {
  @Column({ name: 'product_id', nullable: false, type: Number })
  @Index()
  productId: number;

  @Column({ nullable: false, type: Number })
  date: number;

  @ManyToOne(() => Product, (product) => product.holidays)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
