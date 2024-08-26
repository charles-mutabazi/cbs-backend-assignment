import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Req, UseGuards,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { Prisma } from '@prisma/client';
import hashPassword from '../utils/hashPassword';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService, ) {}

  @Post()
  async create(@Body() createDriverDto: Prisma.DriverCreateInput) {
    return this.driversService.create({
      ...createDriverDto,
      password: await hashPassword(createDriverDto.password),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('myVehicle')
  findDriverVehicle(@Req() req: any) {
    return this.driversService.findDriverVehicle(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDriverDto: Prisma.DriverUpdateInput,
  ) {
    return this.driversService.update(+id, updateDriverDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }
}
