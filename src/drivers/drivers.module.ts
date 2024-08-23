import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DriversController],
  providers: [DriversService, JwtService],
})
export class DriversModule {}
