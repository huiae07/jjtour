import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  cryptoSha512,
  getJwtAccessExpiration,
  getJwtAccessSecret,
} from 'src/common';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entity/account.entity';
import {
  BasicJWTResponseDto,
  PostLoginBodyDto,
  PostSignUpBodyDto,
} from './dto/auth.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtSevice: JwtService,
  ) {}

  async login({
    email,
    password,
  }: PostLoginBodyDto): Promise<BasicJWTResponseDto> {
    const account = await this.accountService.findOneByEmail(email);
    if (!account) {
      throw new UnauthorizedException();
    }
    if (account.password !== cryptoSha512(password, account.salt)) {
      throw new UnauthorizedException();
    }
    return this.makeBasicJWTResponse(account);
  }

  async signUp({
    email,
    password,
    name,
  }: PostSignUpBodyDto): Promise<BasicJWTResponseDto> {
    if (await this.accountService.findOneByEmail(email)) {
      throw new BadRequestException();
    }
    const account = await this.accountService.createAccountOne({
      email,
      password,
      name,
    });
    return this.makeBasicJWTResponse(account);
  }

  makeBasicJWTResponse(account: Account): BasicJWTResponseDto {
    const accessToken = this.makeJWT(account);
    return {
      name: account.name,
      accessToken: accessToken,
    };
  }

  makeJWT(account: Account): string {
    const payload = {
      sub: account.id,
      name: account.name,
    };

    return this.jwtSevice.sign(payload, {
      secret: getJwtAccessSecret(),
      expiresIn: `${getJwtAccessExpiration()}s`,
    });
  }
}
