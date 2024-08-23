import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private driverService: DriversService,
  ) {}

  async validateUser(authPayloadDto: AuthPayloadDto): Promise<string | null> {
    if (authPayloadDto.accountType == 'driver') {
      return await this.driverService.validateDriver(authPayloadDto);
    } else {
      return await this.userService.validateUser(authPayloadDto);
    }
  }
}
