import { Module } from '@nestjs/common';
import { ProductSellerController } from './product.seller.controller';
import { ProductService } from './product.service';
import { AccountModule } from '../account/account.module';
import { ProductRepositoryModule } from './repository/product.repository.module';
import { ProductCustomerController } from './product.customer.controller';

@Module({
  imports: [AccountModule, ProductRepositoryModule],
  controllers: [ProductSellerController, ProductCustomerController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
