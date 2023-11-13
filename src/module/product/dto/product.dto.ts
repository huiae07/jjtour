import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostProductBodyDto {
  @ApiProperty({
    description: '투어 상품 이름',
    type: String,
    example: '투어 상품 이름',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class PostProductHolidayBodyDto {
  @ApiProperty({
    description: '휴식 요일 리스트, 일~토 : 0~6',
    type: [Number],
    example: [0, 2, 3],
    required: false,
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  weeks?: number[];

  @ApiProperty({
    description: '휴식 날짜 리스트',
    type: String,
    example: [20231115, 20231117],
    required: false,
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  dates?: number[];
}

export class DeleteProductHolidayBodyDto {
  @ApiProperty({
    description: '휴식 요일 리스트, 일~토 : 0~6',
    type: [Number],
    example: [0, 2, 3],
    required: false,
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  weeks?: number[];

  @ApiProperty({
    description: '휴식 날짜 리스트',
    type: String,
    example: [20231115, 20231117],
    required: false,
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  dates?: number[];
}

class ProductResponseDto {
  @ApiProperty({
    description: '투어 상품 고유 아이디',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '투어 상품 이름',
    type: String,
    example: '[솔직한 Tour ] LA 하루여행 +그리피스천문대 LA야경',
  })
  name: string;

  @ApiProperty({
    description: '투어 예약 시간',
    type: Date,
    example: '2023-11-13T16:23:17.800Z',
  })
  createdAt: Date;
}

export class GetProductsResponseDto {
  @ApiProperty({
    description: '투어 상품 리스트',
    type: [ProductResponseDto],
  })
  products: ProductResponseDto[];
}

export class GetProductResponseDto {
  @ApiProperty({
    description: '투어 상품 고유 아이디',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '투어 상품 이름',
    type: String,
    example: '[솔직한 Tour ] LA 하루여행 +그리피스천문대 LA야경',
  })
  name: string;

  @ApiProperty({
    description: '투어 예약 시간',
    type: Date,
    example: '2023-11-13T16:23:17.800Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '투어 예약 가능 날짜',
    type: [Number],
    example: [20231114, 20231115],
  })
  reservationDates: number[];
}

class SellerProductResponseDto {
  @ApiProperty({
    description: '투어 상품 고유 아이디',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '투어 상품 이름',
    type: String,
    example: '[솔직한 Tour ] LA 하루여행 +그리피스천문대 LA야경',
  })
  name: string;

  @ApiProperty({
    description: '투어 예약 시간',
    type: Date,
    example: '2023-11-13T16:23:17.800Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '투어 하루 단위 휴일',
    type: [Number],
    example: [20231114, 20231115],
  })
  holidays: number[];

  @ApiProperty({
    description: '투어 요일 단위 휴일',
    type: [Number],
    example: [1, 3, 4],
  })
  holidayWeeks: number[];
}

export class GetSellerProductsResponseDto {
  @ApiProperty({
    description: '투어 상품 리스트',
    type: [SellerProductResponseDto],
  })
  products: SellerProductResponseDto[];
}
