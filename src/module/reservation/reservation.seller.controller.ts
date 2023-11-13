import {
  Controller,
  Post,
  UseGuards,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthUserGuard, JwtAuthType, ReqUser } from 'src/common';
import { ReservationService } from './reservation.service';
import { Account } from '../account/entity/account.entity';
import { GetSellerReservationsResponseDto } from './dto/reservation.dto';

@Controller({ path: 'seller/reservations', version: '1' })
@ApiSecurity(JwtAuthType.USER)
@ApiTags('판매자 전용 예약')
@UseGuards(AuthUserGuard)
export class ReservationSellerController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post(':reservationId')
  @ApiOperation({ summary: '투어 예약 승인' })
  async approveReservation(
    @ReqUser() account: Account,
    @Param('reservationId') reservationId: number,
  ) {
    return this.reservationService.approveReservation(account, reservationId);
  }

  @Delete(':reservationId')
  @ApiOperation({ summary: '투어 예약 거절' })
  async rejectReservation(
    @ReqUser() account: Account,
    @Param('reservationId') reservationId: number,
  ) {
    return this.reservationService.rejectReservation(account, reservationId);
  }

  @Get()
  @ApiOperation({ summary: '투어 예약 리스트 조회' })
  @ApiOkResponse({ type: GetSellerReservationsResponseDto })
  async getReservations(
    @ReqUser() account: Account,
  ): Promise<GetSellerReservationsResponseDto> {
    return this.reservationService.getReservations(account);
  }
}
