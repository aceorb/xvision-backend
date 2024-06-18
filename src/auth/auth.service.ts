import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { TokenResponse } from './dtos/token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const matched = await compare(pass, user.password);
      if (!matched) {
        return null;
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async addUser(name: string, email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new BadRequestException('email is already in use');
    }
    return this.usersService.add(name, email, password);
  }

  login(user: any): TokenResponse {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
