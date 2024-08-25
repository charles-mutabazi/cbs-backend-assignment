import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BookingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createBookingDto: Prisma.BookingCreateInput,
    hierarchyLevel: number,
  ) {
    // the hierarchyLevel is used to determine if the user is a driver or an employee
    if (hierarchyLevel == undefined) {
      throw new ForbiddenException('You are not allowed to create a booking');
    }

    // use the userId of the logged-in user to create the booking
    return this.databaseService.booking.create({ data: createBookingDto });
  }

  async findAll() {
    return this.databaseService.booking.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.booking.findUnique({ where: { id } });
  }

  async update(
    userId: number,
    bookingId: number,
    updateBookingDto: Prisma.BookingUpdateInput,
  ) {
    const booking = await this.databaseService.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId && booking.driverId !== userId) {
      throw new ForbiddenException('You are not allowed to edit this booking');
    }

    return this.databaseService.booking.update({
      where: { id: bookingId },
      data: updateBookingDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.booking.delete({ where: { id } });
  }

  async getBookingsByUserId(currentUserId: number, isEmployee: boolean) {
    const bookings = await this.databaseService.booking.findMany({
      where: {
        driverId: !isEmployee ? currentUserId : undefined,
        userId: isEmployee   ? currentUserId : undefined,
      },
      include: {
        user: true,
        vehicle: true,
        driver: true,
      },
    });

    return bookings.map((booking) => ({
      id: booking.id,
      userName: booking.user.names,
      vehicleName: booking.vehicle.name,
      licensePlate: booking.vehicle.licensePlate,
      vehicleCapacity: booking.vehicle.capacity,
      driverName: booking.driver ? booking.driver.names : null, // Handle optional driver
      slotDateTime: booking.slotDateTime,
      destination: booking.destination,
      status: booking.status,
    }));
  }
}
