import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(authPayloadDto: AuthPayloadDto): Promise<string | null> {
    return await this.userService.validateUser(authPayloadDto);
  }
}
