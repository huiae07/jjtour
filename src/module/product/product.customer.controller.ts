import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import {
  GetProductResponseDto,
  GetProductsResponseDto,
} from './dto/product.dto';

@Controller({ path: 'products', version: '1' })
@ApiTags('고객 전용 투어 상품')
export class ProductCustomerController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: '투어 상품 리스트 조회' })
  @ApiOkResponse({ type: GetProductsResponseDto })
  async getProducts(): Promise<GetProductsResponseDto> {
    return this.productService.getProductsForCustomer();
  }

  @Get(':productId')
  @ApiOperation({ summary: '투어 상품 상세 조회' })
  @ApiOkResponse({ type: GetProductResponseDto })
  async getProduct(
    @Param('productId') productId: number,
  ): Promise<GetProductResponseDto> {
    return this.productService.getProductForCustomer(productId);
  }
}
