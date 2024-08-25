import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class VehiclesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createVehicleDto: Prisma.VehicleCreateInput) {
    return this.databaseService.vehicle.create({
      data: createVehicleDto,
    });
  }

  async findAll() {
    return this.databaseService.vehicle.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.vehicle.findUnique({ where: { id } });
  }

  async update(id: number, updateVehicleDto: Prisma.VehicleUpdateInput) {
    return this.databaseService.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.vehicle.delete({ where: { id } });
  }
}
