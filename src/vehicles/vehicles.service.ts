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

  async findAvailableVehiclesBasedOnSlots(slotDateTime: Date) {
    const vehicles = await this.databaseService.vehicle.findMany({
      where: {
        bookings: {
          none: {
            slotDateTime: slotDateTime,
          },
        },
      },
      include: {
        driver: true,
      },
    });

    return vehicles.map((vehicle) => ({
      id: vehicle.id,
      name: vehicle.name,
      licensePlate: vehicle.licensePlate,
      driverNames: vehicle.driver?.names ?? null,
      driverId: vehicle.driver?.id ?? null,
      capacity: vehicle.capacity,
    }));
  }
}
