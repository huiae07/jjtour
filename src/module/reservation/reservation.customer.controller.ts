import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import {
  GetReservationResponseDto,
  PostReservationBodyDto,
  PostReservationResponseDto,
} from './dto/reservation.dto';

@Controller({ path: 'reservations', version: '1' })
@ApiTags('고객 전용 예약')
export class ReservationCustomerController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: '투어 상품 예약' })
  @ApiCreatedResponse({ type: PostReservationResponseDto })
  async createReservation(
    @Body() postReservationBodyDto: PostReservationBodyDto,
  ): Promise<PostReservationResponseDto> {
    return this.reservationService.createReservation(postReservationBodyDto);
  }

  @Delete(':token')
  @ApiOperation({ summary: '투어 상품 예약 취소' })
  async cancelReservationByToken(@Param('token') token: string): Promise<void> {
    return this.reservationService.cancelReservationByToken(token);
  }

  @Get(':token')
  @ApiOperation({ summary: '투어 상품 예약 조회' })
  @ApiOkResponse({ type: GetReservationResponseDto })
  async getReservationByToken(
    @Param('token') token: string,
  ): Promise<GetReservationResponseDto> {
    return this.reservationService.getReservationByToken(token);
  }
}
