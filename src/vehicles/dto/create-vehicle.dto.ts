import { Prisma } from '@prisma/client';

export class CreateVehicleDto implements Prisma.VehicleCreateInput {
  name: string
  licensePlate: string
  driverId: number
  capacity: number

  constructor(vehicleRequestDto: VehicleRequestDto) {
    this.name = vehicleRequestDto.name
    this.licensePlate = vehicleRequestDto.licensePlate
    this.driverId = vehicleRequestDto.driverId
    this.capacity = vehicleRequestDto.capacity
  }
}

export interface VehicleRequestDto {
  name: string
  licensePlate: string
  driverId: number
  capacity: number
}

export interface SlotDateTimeReq {
  slotDateTime: Date
}
