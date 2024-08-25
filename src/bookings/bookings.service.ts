import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBookingDto: Prisma.BookingCreateInput) {
    return this.databaseService.booking.create({ data: createBookingDto });
  }

  async findAll() {
    return this.databaseService.booking.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.booking.findUnique({ where: { id } });
  }

  async update(id: number, updateBookingDto: Prisma.BookingUpdateInput) {
    return this.databaseService.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.booking.delete({ where: { id } });
  }
}
