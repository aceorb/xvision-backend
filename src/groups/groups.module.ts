import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { User } from '../users/user.entity';
import { Group } from './group.entity';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [TypeOrmModule.forFeature([Group, User])],
})
export class GroupsModule {}
