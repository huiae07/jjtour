import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ReservationStatus } from 'src/common';

export class PostReservationBodyDto {
  @ApiProperty({
    description: '상품 아이디',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: '예약 날짜',
    type: Number,
    example: 20231120,
  })
  @IsNotEmpty()
  @IsNumber()
  date: number;
}

export class PostReservationResponseDto {
  @ApiProperty({
    description: '투어 예약 토큰',
    type: String,
    example: '40b603ad05231c5585da4b9be8fc3109',
  })
  token: string;
}

export class GetReservationResponseDto {
  @ApiProperty({
    description: '투어 예약 토큰',
    type: String,
    example: '40b603ad05231c5585da4b9be8fc3109',
  })
  token: string;

  @ApiProperty({
    description: '투어 날짜',
    type: Number,
    example: 20231120,
  })
  date: number;

  @ApiProperty({
    description: '투어 예약 시간',
    type: Date,
    example: '2023-11-13T16:23:17.800Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '투어 예약 상태',
    type: String,
    enum: ReservationStatus,
    example: ReservationStatus.APPROVED,
  })
  status: ReservationStatus;

  @ApiProperty({
    description: '투어 상품 이름',
    type: String,
    example: '[솔직한 Tour ] LA 하루여행 +그리피스천문대 LA야경',
  })
  productName: string;
}

class SellerReservation {
  @ApiProperty({
    description: '투어 예약 고유 아이디',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '투어 예약 토큰',
    type: String,
    example: '40b603ad05231c5585da4b9be8fc3109',
  })
  token: string;

  @ApiProperty({
    description: '투어 날짜',
    type: Number,
    example: 20231120,
  })
  date: number;

  @ApiProperty({
    description: '투어 예약 시간',
    type: Date,
    example: '2023-11-13T16:23:17.800Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '투어 예약 상태',
    type: String,
    enum: ReservationStatus,
    example: ReservationStatus.APPROVED,
  })
  status: ReservationStatus;

  @ApiProperty({
    description: '투어 상품 이름',
    type: String,
    example: '[솔직한 Tour ] LA 하루여행 +그리피스천문대 LA야경',
  })
  productName: string;
}

export class GetSellerReservationsResponseDto {
  @ApiProperty({
    description: '투어 예약 리스트',
    type: [SellerReservation],
  })
  reservations: SellerReservation[];
}
