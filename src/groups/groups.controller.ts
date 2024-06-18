import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroupsService } from './groups.service';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GroupDto } from './dtos/group.dto';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) {
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: GroupDto, isArray: true })
  async groups(@Request() req): Promise<GroupDto[]> {
    const userId = req.user.id;
    const allGroups = await this.groupsService.findByUserId(userId);
    return allGroups.map(group => group.toDto());
  }
}
