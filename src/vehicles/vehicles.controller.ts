import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UseGuards,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Prisma } from '@prisma/client';
import { SlotDateTimeReq } from './dto/create-vehicle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: Prisma.VehicleCreateInput) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }

  @Post('available')
  findAvailableVehiclesBasedOnSlots(@Body() req: SlotDateTimeReq) {
    return this.vehiclesService.findAvailableVehiclesBasedOnSlots(
      req.slotDateTime,
    );
  }
}
