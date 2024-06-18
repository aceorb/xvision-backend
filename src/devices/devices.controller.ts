import { Controller, Get, UseGuards, Request, Query, Put, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeviceDto } from './dtos/device.dto';
import { DevicesService } from './devices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryDevicesDto } from './dtos/query-devices.dto';
import { GroupsService } from '../groups/groups.service';

@Controller('devices')
@ApiTags('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {
  constructor(
    private devicesService: DevicesService,
    private groupsService: GroupsService,
    ) {
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: DeviceDto, isArray: true })
  async devices(@Request() request, @Query() query: QueryDevicesDto): Promise<DeviceDto[]> {
    const userId = request.user.id;
    const allDevices = await this.devicesService.findByUserId(userId, query.groupId);
    return allDevices.map(device => device.toDto());
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeviceDto })
  async update(@Param('id') id: number, @Body() body: DeviceDto): Promise<DeviceDto> {
    body.group = await this.groupsService.findById(body.groupId);
    const updated = await this.devicesService.update(id, body);
    return updated.toDto();
  }
}
