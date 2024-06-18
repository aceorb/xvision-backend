import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../devices/device.entity';

@Module({
  controllers: [DashboardController],
  imports: [
    TypeOrmModule.forFeature([Device]),
  ],
  providers: [DashboardService],
})
export class DashboardModule {
}
