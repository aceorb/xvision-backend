import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private devicesRepository: Repository<Device>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
  }

  find(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  async findByUserId(userId: number, groupId: number): Promise<Device[]> {
    const user = await this.usersRepository.findOne({ relations: ['devices'], where: { id: userId }});
    return user.devices;
  }
}
