import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { BookingsService } from '../../bookings/bookings.service';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly bookingService: BookingsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const bookingId = Number(request.params.id);

    const booking = await this.bookingService.findOne(bookingId);

    if (booking.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    return true;
  }
}
