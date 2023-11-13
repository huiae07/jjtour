import { ProductCreateDao } from '../../dao/product.dao';
import { Product } from '../../entity/product.entity';

export const ProductRepositoryInterfaceToken = Symbol(
  'ProductRepositoryInterface',
);

export interface ProductRepositoryInterface {
  find(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  findOneForSeller(accountId: number, id: number): Promise<Product | null>;
  findByAccountId(accountId: number): Promise<Product[]>;
  create(createDao: ProductCreateDao[]): Promise<Product[]>;
}
