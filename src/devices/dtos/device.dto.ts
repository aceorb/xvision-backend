import { ApiProperty } from '@nestjs/swagger';
import { DeviceStatus } from '../enums';
import { Group } from '../../groups/group.entity';

export class DeviceDto {
  @ApiProperty({ required: false })
  id?: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  serial: string;

  @ApiProperty({ type: 'enum', enum: DeviceStatus })
  status: DeviceStatus;

  @ApiProperty()
  event: string;

  @ApiProperty()
  last_connected: Date;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  gps_fix: number;

  @ApiProperty()
  temperature: number;

  @ApiProperty()
  humidity: number;

  @ApiProperty()
  battery: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  settings: string;

  @ApiProperty({ required: false })
  groupId?: number;

  group?: Group;
}
