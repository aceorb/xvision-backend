import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  last_connected: Date;

  @ApiProperty()
  event: string;

}