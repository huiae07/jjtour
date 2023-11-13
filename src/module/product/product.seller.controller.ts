import {
  Body,
  Controller,
  Post,
  UseGuards,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserGuard, JwtAuthType, ReqUser } from 'src/common';
import { ProductService } from './product.service';
import { Account } from '../account/entity/account.entity';
import {
  DeleteProductHolidayBodyDto,
  GetSellerProductsResponseDto,
  PostProductBodyDto,
  PostProductHolidayBodyDto,
} from './dto/product.dto';

@Controller({ path: 'seller/products', version: '1' })
@ApiSecurity(JwtAuthType.USER)
@ApiTags('판매자 전용 투어 상품')
@UseGuards(AuthUserGuard)
export class ProductSellerController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: '투어 상품 생성' })
  async createProduct(
    @ReqUser() account: Account,
    @Body() postProductBodyDto: PostProductBodyDto,
  ) {
    return this.productService.createProduct(account, postProductBodyDto);
  }

  @Post(':productId/holidays')
  @ApiOperation({ summary: '투어 상품 휴일 추가' })
  async createProductHoliday(
    @ReqUser() account: Account,
    @Param('productId') productId: number,
    @Body() postProductHolidayBodyDto: PostProductHolidayBodyDto,
  ) {
    return this.productService.createProductHoliday(
      account,
      productId,
      postProductHolidayBodyDto,
    );
  }

  @Delete(':productId/holidays')
  @ApiOperation({ summary: '투어 상품 휴일 삭제' })
  async deleteProductHoliday(
    @ReqUser() account: Account,
    @Param('productId') productId: number,
    @Body() deleteProductHolidayBodyDto: DeleteProductHolidayBodyDto,
  ) {
    return this.productService.deleteProductHoliday(
      account,
      productId,
      deleteProductHolidayBodyDto,
    );
  }

  @Get()
  @ApiOperation({ summary: '투어 상품 조회' })
  @ApiOkResponse({ type: GetSellerProductsResponseDto })
  async getProducts(
    @ReqUser() account: Account,
  ): Promise<GetSellerProductsResponseDto> {
    return this.productService.getProductsForSeller(account);
  }
}
