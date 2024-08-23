import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { AuthPayloadDto } from '../auth/dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DriversService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async create(createDriverDto: Prisma.DriverCreateInput) {
    return this.databaseService.driver.create({ data: createDriverDto });
  }

  async findAll() {
    return this.databaseService.driver.findMany();
  }

  findOne(id: number) {
    return this.databaseService.driver.findUnique({ where: { id } });
  }

  update(id: number, updateDriverDto: Prisma.DriverUpdateInput) {
    return this.databaseService.driver.update({
      where: { id },
      data: updateDriverDto,
    });
  }

  remove(id: number) {
    return this.databaseService.driver.delete({ where: { id } });
  }

  async validateDriver({ email, password }: AuthPayloadDto) {
    const findDriver = await this.databaseService.driver.findUnique({
      where: { email },
    });
    if (findDriver && (await bcrypt.compare(password, findDriver.password))) {
      const { password, ...driver } = findDriver;
      return this.jwtService.sign(driver);
    }
    return null;
  }
}
