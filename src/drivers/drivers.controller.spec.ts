import { Test, TestingModule } from '@nestjs/testing';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { driverMock, vehicle } from '../utils/mock-data/testData';

describe('DriversController', () => {
  let controller: DriversController;
  let service: DriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        {
          provide: DriversService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findDriverVehicle: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DriversController>(DriversController);
    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should hash the password and call create service', async () => {
      jest.spyOn(service, 'create').mockResolvedValue({ ...driverMock });
      const result = await controller.create(driverMock);
      expect(result).toEqual({ ...driverMock });
    });
  });

  describe('findAll', () => {
    it('should return an array of drivers', async () => {
      const drivers = [driverMock];
      jest.spyOn(service, 'findAll').mockResolvedValue(drivers);

      expect(await controller.findAll()).toBe(drivers);
    });
  });

  describe('findDriverVehicle', () => {
    it('should return the vehicle of the logged-in driver', async () => {
      const req = { user: { id: 1 } };
      jest.spyOn(service, 'findDriverVehicle').mockResolvedValue(vehicle);

      expect(await controller.findDriverVehicle(req)).toBe(vehicle);
    });
  });

  describe('findOne', () => {
    it('should return a single driver by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(driverMock);

      expect(await controller.findOne('1')).toBe(driverMock);
    });
  });

  // Add tests for update and remove methods
});
