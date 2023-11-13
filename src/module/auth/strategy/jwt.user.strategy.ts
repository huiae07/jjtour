import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getJwtAccessSecret, JwtAuthType } from 'src/common';
import { AccountService } from 'src/module/account/account.service';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(
  Strategy,
  JwtAuthType.USER,
) {
  constructor(private accountService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: getJwtAccessSecret(),
    });
  }

  async validate(payload: any) {
    const account = await this.accountService.findOneById(payload.sub);
    if (!account) {
      throw new UnauthorizedException();
    }
    return {
      user: account,
      isExpired: payload.exp < Date.now() / 1000,
    };
  }
}
