import { ApiProperty } from '@nestjs/swagger';

export class OverviewDto {
  @ApiProperty()
  totalDeviceCount: number;

  @ApiProperty()
  onlineDeviceCount: number;

  @ApiProperty()
  offlineDeviceCount: number;

  @ApiProperty()
  warningDeviceCount: number;

}