import { BookingStatus } from '@prisma/client';

export const vehicle = {
  id: 1,
  name: 'Test Vehicle',
  licensePlate: 'ABC123',
  capacity: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const driverMock = {
  id: 1,
  names: 'Test Driver',
  email: 'test@example.com',
  password: 'plainPassword',
  vehicleId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const bookingMock = {
  id: 1,
  userId: 1,
  vehicleId: 1,
  driverId: 1,
  slotDateTime: new Date(),
  destination: 'Destination A',
  status: BookingStatus.PENDING,
  createdAt: new Date(),
  updatedAt: new Date(),
};
