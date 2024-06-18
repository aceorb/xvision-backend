import { ApiProperty } from '@nestjs/swagger';
import { DeviceDto } from '../../devices/dtos/device.dto';

export class GroupDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  note: string;

  @ApiProperty({ type: DeviceDto, isArray: true, required: false })
  devices?: DeviceDto[];
}
