import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    return req.user; // the token is attached to the request object from the LocalAuthGuard
  }
}
