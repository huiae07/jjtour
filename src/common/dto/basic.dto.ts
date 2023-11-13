import { ApiProperty } from '@nestjs/swagger';

export class BasicSuccessResponseDto {
  @ApiProperty({
    description: 'IsSuccess',
    type: Boolean,
    example: true,
  })
  success: boolean;
}
