import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { User } from '../users/user.entity';
import { Group } from './group.entity';
import { UsersService } from '../users/users.service';

@Module({
  providers: [GroupsService,UsersService],
  controllers: [GroupsController],
  imports: [TypeOrmModule.forFeature([Group, User])],
  exports: [GroupsService]
})
export class GroupsModule {
}
