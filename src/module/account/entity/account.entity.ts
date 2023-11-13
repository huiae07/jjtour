import { Entity, Column, OneToMany, BeforeInsert, Index } from 'typeorm';
import { BaseEntity, cryptoSha512 } from 'src/common';
import { Product } from 'src/module/product/entity/product.entity';
import { Reservation } from 'src/module/reservation/entity/reservation.entity';
import { InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @Column({ nullable: false, type: String, length: 64 })
  name: string;

  @Column({ nullable: false, type: String, length: 64 })
  @Index()
  email: string;

  @Column({ nullable: false, type: String, default: '', length: 128 })
  salt: string;

  @Column({ nullable: false, type: String, length: 128 })
  password: string;

  @OneToMany(() => Product, (product) => product.account)
  products: Product[];

  @OneToMany(() => Reservation, (reservation) => reservation.account)
  reservations: Reservation[];

  @BeforeInsert()
  async setHashPassword(): Promise<void> {
    try {
      this.salt = crypto.randomBytes(64).toString('base64');
      this.password = cryptoSha512(this.password, this.salt);
    } catch (error) {
      throw new InternalServerErrorException('setting password is failed');
    }
  }
}
