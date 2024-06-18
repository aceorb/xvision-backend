import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { DeviceDto } from './dtos/device.dto';
import { DevicesService } from './devices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QueryDevicesDto } from './dtos/query-devices.dto';

@Controller('devices')
@UseGuards(JwtAuthGuard)
export class DevicesController {

  constructor(private devicesService: DevicesService) { }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: DeviceDto, isArray: true })
  async devices(@Request() request, @Query() query: QueryDevicesDto): Promise<DeviceDto[]> {
    const userId = request.user.id;
    const allDevices = await this.devicesService.findByUserId(userId, query.groupId);
    return allDevices.map(device => device.toDto());
  }
}
