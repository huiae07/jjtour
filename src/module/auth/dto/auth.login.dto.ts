import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class PostSignUpBodyDto {
  @ApiProperty({
    description: '계정 이름',
    type: String,
    example: '홍길동',
  })
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'test@google.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    type: String,
    example: 'Password1!',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsNotEmpty()
  password: string;
}

export class PostLoginBodyDto {
  @ApiProperty({
    type: String,
    example: 'test@google.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    type: String,
    example: 'password',
  })
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}

export class BasicJWTResponseDto {
  @ApiProperty({
    description: 'User Name',
    type: String,
    example: 'name',
  })
  name: string;

  @ApiProperty({
    description: 'Access Token',
    type: String,
    example: 'accessToken',
  })
  accessToken: string;
}
