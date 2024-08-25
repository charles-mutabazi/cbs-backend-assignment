import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BookingRequestDto, CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() bookingRequestDto: BookingRequestDto) {
    console.log("bookingRequestDto", bookingRequestDto);
    // console.log("bookingRequestDto", new CreateBookingDto(bookingRequestDto));
    return this.bookingsService.create(new CreateBookingDto(bookingRequestDto));
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: Prisma.BookingUpdateInput,
  ) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
