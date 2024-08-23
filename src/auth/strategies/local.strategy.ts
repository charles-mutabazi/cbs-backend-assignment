import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: any, username: string, password: string) {
    const token = await this.authService.validateUser({
      email: username,
      password: password,
      accountType: req.body.accountType,
    });
    if (!token) throw new UnauthorizedException();
    return { token: token };
  }
}
