import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from './device.entity';
import { DeviceDto } from './dtos/device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
  ) {
  }

  find(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  async findByUserId(userId: number, groupId?: number): Promise<Device[]> {
    if (!groupId) {
      return this.devicesRepository.createQueryBuilder('devices')
      .leftJoinAndSelect('devices.group', 'group')
      .leftJoinAndSelect('devices.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
    }
    return this.devicesRepository.createQueryBuilder('devices')
    .leftJoinAndSelect('devices.user', 'user')
    .leftJoinAndSelect('devices.group', 'group')
    .where('user.id = :userId', { userId })
    .where('group.id = :groupId', { groupId })
    .getMany();
  }

  async update(id: number, dto: DeviceDto): Promise<Device> {
    delete dto.groupId;
    const updateResult = await this.devicesRepository.update({ id }, dto);
    return this.devicesRepository.findOne({ id });
  }
}
