import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
  }

  find(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  async findByUserId(userId: number): Promise<Group[]> {
    const user = await this.usersRepository.findOne({ relations: ['groups'], where: { id: userId } });
    return user.groups;
  }
}
