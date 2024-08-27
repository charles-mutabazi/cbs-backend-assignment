import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { driverMock } from '../utils/mock-data/testData';
import { AuthPayloadDto } from '../auth/dto/auth.dto';

describe('DriversService', () => {
  let service: DriversService;
  let databaseService: DatabaseService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: DatabaseService,
          useValue: {
            driver: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a driver', async () => {
      const createDriverDto: Prisma.DriverCreateInput = {
        names: 'Test Driver',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      jest
        .spyOn(databaseService.driver, 'create')
        .mockResolvedValue(createDriverDto as any);

      const result = await service.create(createDriverDto);
      expect(result).toBe(createDriverDto);
      expect(databaseService.driver.create).toHaveBeenCalledWith({
        data: createDriverDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of drivers', async () => {
      const drivers = [driverMock];
      jest.spyOn(databaseService.driver, 'findMany').mockResolvedValue(drivers);

      const result = await service.findAll();
      expect(result).toBe(drivers);
    });
  });

  describe('findOne', () => {
    it('should return a single driver by id', async () => {
      jest
        .spyOn(databaseService.driver, 'findUnique')
        .mockResolvedValue(driverMock);

      const result = await service.findOne(1);
      expect(result).toBe(driverMock);
    });
  });

  describe('findDriverVehicle', () => {
    it('should return the vehicle of the driver', async () => {
      const vehicle = { id: 1, name: 'Test Vehicle' };
      const driver = { id: 1, name: 'Test Driver', vehicle };
      jest
        .spyOn(databaseService.driver, 'findUniqueOrThrow')
        .mockResolvedValue(driver as any);

      const result = await service.findDriverVehicle(1);
      expect(result).toBe(vehicle);
    });
  });

  describe('remove', () => {
    it('should remove a driver by id', async () => {
      const removedDriver = { id: 1 };
      jest
        .spyOn(databaseService.driver, 'delete')
        .mockResolvedValue(removedDriver as any);

      const result = await service.remove(1);
      expect(result).toBe(removedDriver);
    });
  });

  describe('validateDriver', () => {
    it('should return a signed JWT token if credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('plainPassword', 10);
      const findDriver = {
        password: hashedPassword,
        ...driverMock,
      };

      jest
        .spyOn(databaseService.driver, 'findUnique')
        .mockResolvedValue(findDriver);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('signed-token');

      const result = await service.validateDriver({
        email: driverMock.email,
        password: 'plainPassword',
      } as AuthPayloadDto);
      expect(result).toBe('signed-token');
    });

    it('should return null if credentials are invalid', async () => {
      const authPayloadDto: AuthPayloadDto = {
        email: 'test@example.com',
        password: 'plainPassword',
        accountType: 'driver',
      };

      jest.spyOn(databaseService.driver, 'findUnique').mockResolvedValue(null);

      const result = await service.validateDriver(authPayloadDto);
      expect(result).toBeNull();
    });
  });
});
