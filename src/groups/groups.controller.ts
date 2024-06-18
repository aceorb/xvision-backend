import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroupsService } from './groups.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GroupDto } from './dtos/group.dto';
import { UsersService } from '../users/users.service';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(
    private groupsService: GroupsService,
    private userService: UsersService,
    ) {
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: GroupDto, isArray: true })
  async groups(@Request() req): Promise<GroupDto[]> {
    const userId = req.user.id;
    const allGroups = await this.groupsService.findByUserId(userId);
    return allGroups.map(group => group.toDto());
  }

  @ApiBearerAuth()
  @Post('create')
  @ApiOkResponse({ type: GroupDto })
  async create(@Request() req, @Body() body: GroupDto): Promise<GroupDto> {
    const userId = req.user.id;
    const user = await this.userService.findById(userId);
    const added = await this.groupsService.add(user, body);
    return added.toDto();
  }

}
