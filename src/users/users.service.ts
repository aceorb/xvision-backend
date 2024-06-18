import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  add(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }
}
