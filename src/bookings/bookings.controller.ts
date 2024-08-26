import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BookingRequestDto, CreateBookingDto } from './dto/create-booking.dto';
import { Throttle } from '@nestjs/throttler';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Throttle({ default: { limit: 3, ttl: 60_000 } }) // 3 requests per minute to avoid abuse
  @Post()
  create(@Body() bookingRequestDto: BookingRequestDto, @Req() req: any) {
    const data = {
      ...bookingRequestDto,
      userId: req.user.id,
    };
    return this.bookingsService.create(
      new CreateBookingDto(data),
      req.user.hierarchyLevel,
    );
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Get()
  findBookingsByUserId(@Req() req: any) {
    return this.bookingsService.getBookingsByUserId(
      req.user.id,
      req.user.hierarchyLevel !== undefined,
    );
  }

  @Patch(':id')
  update(
    @Param('id') bookingId: string,
    @Body() updateBookingDto: Prisma.BookingUpdateInput,
    @Req() req: any,
  ) {
    const userId = req.user.id; // Assuming the user ID is stored in req.user
    return this.bookingsService.update(+userId, +bookingId, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
