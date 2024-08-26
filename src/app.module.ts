import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DriversModule } from './drivers/drivers.module';
import { BookingsModule } from './bookings/bookings.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    DriversModule,
    BookingsModule,
    VehiclesModule,
    ThrottlerModule.forRoot([
      {
        ttl: 10_000, // 10 second
        limit: 10, // 10 requests per 10 seconds
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
