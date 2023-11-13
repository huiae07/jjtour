import { ApiProperty } from '@nestjs/swagger';

class AccountProfile {
  @ApiProperty({
    description: 'User Name',
    type: String,
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: 'User Email',
    type: String,
    example: 'user@google.com',
  })
  email: string;
}

export class GetAccountMyPage {
  @ApiProperty({
    description: 'Account Profile',
    type: AccountProfile,
  })
  profile: AccountProfile;
}
