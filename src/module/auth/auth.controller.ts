import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  BasicJWTResponseDto,
  PostLoginBodyDto,
  PostSignUpBodyDto,
} from './dto/auth.login.dto';

@Controller({ version: '1', path: 'auth' })
@ApiTags('판매자 계정 관리')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({ summary: '회원 가입' })
  @ApiResponse({ status: 201, type: BasicJWTResponseDto })
  async signUp(@Body() body: PostSignUpBodyDto): Promise<BasicJWTResponseDto> {
    return this.authService.signUp(body);
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 201, type: BasicJWTResponseDto })
  async login(@Body() body: PostLoginBodyDto): Promise<BasicJWTResponseDto> {
    return this.authService.login(body);
  }
}
