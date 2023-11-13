import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthType } from './constants';

@Injectable()
export class AuthUserGuard extends AuthGuard(JwtAuthType.USER) {
  handleRequest<TUser = any>(err: any, payload: any): TUser {
    if (err || !payload || payload.isExpired) {
      throw new UnauthorizedException();
    }
    return payload.user;
  }
}
