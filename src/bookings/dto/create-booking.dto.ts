import { BookingStatus, Prisma } from '@prisma/client';

export class CreateBookingDto implements Prisma.BookingCreateInput{
  user: { connect: { id: number } };
  vehicle: { connect: { id: number } };
  driver: { connect: { id: number } };
  slotDateTime: Date;
  destination: string;
  status: BookingStatus;

  constructor(bookingRequestDto: BookingRequestDto) {
    this.user = { connect: { id: bookingRequestDto.userId } };
    this.vehicle = { connect: { id: bookingRequestDto.vehicleId } };
    this.driver = { connect: { id: bookingRequestDto.driverId } };
    this.slotDateTime = bookingRequestDto.slotDateTime;
    this.destination = bookingRequestDto.destination;
    this.status = BookingStatus.PENDING;
  }
}

export interface BookingRequestDto {
  userId: number;
  vehicleId: number;
  driverId: number;
  slotDateTime: Date;
  destination: string;
}
