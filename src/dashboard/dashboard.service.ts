import { Injectable } from '@nestjs/common';
import { Device } from '../devices/device.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OverviewDto } from './dtos/overview.dto';
import { EventDto } from './dtos/event.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
  ) {
  }

  async getOverview(userId: number): Promise<OverviewDto> {
    const totalDeviceCount = await this.devicesRepository.createQueryBuilder('devices')
    .leftJoinAndSelect('devices.user', 'user')
    .where('user.id = :userId', { userId })
    .getCount();
    const onlineDeviceCount = await this.devicesRepository.createQueryBuilder('devices')
    .leftJoinAndSelect('devices.user', 'user')
    .where('user.id = :userId', { userId })
    .andWhere('status = "ONLINE"')
    .getCount();
    const offlineDeviceCount = await this.devicesRepository.createQueryBuilder('devices')
    .leftJoinAndSelect('devices.user', 'user')
    .where('user.id = :userId', { userId })
    .andWhere('status = "OFFLINE"')
    .getCount();
    const warningDeviceCount = await this.devicesRepository.createQueryBuilder('devices')
    .leftJoinAndSelect('devices.user', 'user')
    .where('user.id = :userId', { userId })
    .andWhere('event != "OK"')
    .getCount();
    return { totalDeviceCount, onlineDeviceCount, offlineDeviceCount, warningDeviceCount };
  }

  async getEvents(userId: number): Promise<EventDto[]> {
    const devices = await this.devicesRepository.createQueryBuilder('devices')
    .leftJoinAndSelect('devices.user', 'user')
    .where('user.id = :userId', { userId })
    .where('event != "OK"')
    .getMany();
    return devices.map(device => ({
      id: device.id,
      name: device.name,
      last_connected: device.last_connected,
      event: device.event,
    }));
  }
}
