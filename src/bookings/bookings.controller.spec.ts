import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { bookingMock } from '../utils/mock-data/testData';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingsService;

  const mockBookingService = {
    create: jest.fn(),
    getBookingsByUserId: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [{ provide: BookingsService, useValue: mockBookingService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(ThrottlerGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking', async () => {
      const bookingDto = {
        destination: 'Test Location',
        slotDateTime: new Date(),
        vehicleId: 1,
      };
      const user = { id: 1, hierarchyLevel: 2 };
      const req = { user };
      const createdBooking = { id: 1, ...bookingDto };

      mockBookingService.create.mockResolvedValue(createdBooking);

      const result = await controller.create(bookingMock, req);
      expect(result).toEqual(createdBooking);
      expect(service.create).toHaveBeenCalledWith(
        expect.any(Object),
        user.hierarchyLevel,
      );
    });
  });

  describe('findBookingsByUserId', () => {
    it('should return bookings for the logged-in user', async () => {
      const user = { id: 1, hierarchyLevel: 2 };
      const req = { user };
      const bookings = [
        { id: 1, destination: 'Test Location', slotDateTime: new Date() },
      ];

      mockBookingService.getBookingsByUserId.mockResolvedValue(bookings);

      const result = await controller.findBookingsByUserId(req);
      expect(result).toEqual(bookings);
      expect(service.getBookingsByUserId).toHaveBeenCalledWith(user.id, true);
    });
  });

  describe('findOne', () => {
    const booking = { id: 1, destination: 'Test Location' };
    it('should return a booking by id', async () => {
      mockBookingService.findOne.mockResolvedValue(booking);

      const result = await controller.findOne('1');
      expect(result).toEqual(booking);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a booking', async () => {
      const updateDto = { destination: 'Updated Location' };
      const user = { id: 1 };
      const req = { user };
      const updatedBooking = { id: 1, ...updateDto };

      mockBookingService.update.mockResolvedValue(updatedBooking);

      const result = await controller.update('1', updateDto, req);
      expect(result).toEqual(updatedBooking);
      expect(service.update).toHaveBeenCalledWith(user.id, 1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a booking', async () => {
      mockBookingService.remove.mockResolvedValue({});

      const result = await controller.remove('1');
      expect(result).toEqual({});
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
