import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { DatabaseService } from '../database/database.service';
import { BookingStatus, Prisma } from '@prisma/client';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { bookingMock } from '../utils/mock-data/testData';

describe('BookingsService', () => {
  let service: BookingsService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: DatabaseService,
          useValue: {
            booking: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw a ForbiddenException if hierarchyLevel is undefined', async () => {
      const createBookingDto = {} as Prisma.BookingCreateInput;
      await expect(service.create(createBookingDto, undefined)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should create a booking if hierarchyLevel is defined', async () => {
      const booking: Prisma.BookingCreateInput = {
        user: { connect: { id: 1 } },
        vehicle: { connect: { id: 1 } },
        driver: { connect: { id: 1 } },
        slotDateTime: new Date(),
        destination: 'Destination A',
        status: BookingStatus.PENDING,
      };
      jest
        .spyOn(databaseService.booking, 'create')
        .mockResolvedValue(bookingMock);

      const result = await service.create(booking, 1);
      expect(result).toEqual(bookingMock);
    });
  });

  describe('findAll', () => {
    it('should return all bookings', async () => {
      const bookings = [bookingMock];
      jest
        .spyOn(databaseService.booking, 'findMany')
        .mockResolvedValue(bookings);

      const result = await service.findAll();
      expect(result).toEqual(bookings);
    });
  });

  describe('findOne', () => {
    it('should return a booking by ID', async () => {
      jest
        .spyOn(databaseService.booking, 'findUnique')
        .mockResolvedValue(bookingMock);

      const result = await service.findOne(1);
      expect(result).toBe(bookingMock);
    });
  });

  describe('update', () => {
    it('should update a booking if the user is allowed to edit', async () => {
      const updateBookingDto = {} as Prisma.BookingUpdateInput;
      const booking = bookingMock;
      jest
        .spyOn(databaseService.booking, 'findUnique')
        .mockResolvedValue(booking);
      jest.spyOn(databaseService.booking, 'update').mockResolvedValue(booking);

      const result = await service.update(1, 1, updateBookingDto);
      expect(result).toEqual(booking);
      expect(databaseService.booking.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateBookingDto,
      });
    });

    it('should throw a NotFoundException if booking is not found', async () => {
      jest.spyOn(databaseService.booking, 'findUnique').mockResolvedValue(null);

      await expect(
        service.update(1, 1, {} as Prisma.BookingUpdateInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a booking by ID', async () => {
      const booking = bookingMock;
      jest.spyOn(databaseService.booking, 'delete').mockResolvedValue(booking);

      const result = await service.remove(1);
      expect(result).toEqual(booking);
    });
  });

  describe('getBookingsByUserId', () => {
    it('should return bookings for the user if isEmployee is true', async () => {
      const bookings = [
        {
          id: 1,
          user: { names: 'John Doe' },
          vehicle: { name: 'Car', licensePlate: 'XYZ 123', capacity: 4 },
          driver: { names: 'Jane Doe' },
          slotDateTime: new Date(),
          destination: 'Destination A',
          status: 'PENDING',
        },
      ] as any[];
      jest
        .spyOn(databaseService.booking, 'findMany')
        .mockResolvedValue(bookings);

      const result = await service.getBookingsByUserId(1, true);
      expect(result).toEqual([
        {
          id: 1,
          userName: 'John Doe',
          vehicleName: 'Car',
          licensePlate: 'XYZ 123',
          vehicleCapacity: 4,
          driverName: 'Jane Doe',
          slotDateTime: bookings[0].slotDateTime,
          destination: 'Destination A',
          status: 'PENDING',
        },
      ]);
    });

    it('should return bookings for the user if isEmployee is false', async () => {
      const bookings = [
        {
          id: 1,
          user: { names: 'John Doe' },
          vehicle: { name: 'Car', licensePlate: 'XYZ 123', capacity: 4 },
          driver: { names: 'Jane Doe' },
          slotDateTime: new Date(),
          destination: 'Destination A',
          status: 'PENDING',
        },
      ] as any[];
      jest
        .spyOn(databaseService.booking, 'findMany')
        .mockResolvedValue(bookings);

      const result = await service.getBookingsByUserId(1, false);
      expect(result).toEqual([
        {
          id: 1,
          userName: 'John Doe',
          vehicleName: 'Car',
          licensePlate: 'XYZ 123',
          vehicleCapacity: 4,
          driverName: 'Jane Doe',
          slotDateTime: bookings[0].slotDateTime,
          destination: 'Destination A',
          status: 'PENDING',
        },
      ]);
    });
  });
});
