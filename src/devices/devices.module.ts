import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device } from './device.entity';
import { User } from '../users/user.entity';

@Module({
  controllers: [DevicesController],
  imports: [TypeOrmModule.forFeature([Device, User])],
  providers: [DevicesService]
})
export class DevicesModule {}
