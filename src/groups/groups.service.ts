import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { GroupDto } from './dtos/group.dto';

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

  findById(id: number): Promise<Group> {
    return this.groupsRepository.findOne(id);
  }

  async add(user: User, payload: GroupDto): Promise<Group> {
    const group = new Group();
    group.user = user;
    group.name = payload.name;
    group.note = payload.note;
    return this.groupsRepository.save(group);
  }

  async findByUserId(userId: number): Promise<Group[]> {
    return this.groupsRepository.createQueryBuilder('groups')
      .leftJoinAndSelect('groups.user', 'user')
      .leftJoinAndSelect('groups.devices', 'devices')
      .where('user.id = :userId', { userId })
      .getMany();
  }
}
