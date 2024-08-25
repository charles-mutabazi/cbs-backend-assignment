import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DriversModule } from './drivers/drivers.module';
import { BookingsModule } from './bookings/bookings.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, DriversModule, BookingsModule, VehiclesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
