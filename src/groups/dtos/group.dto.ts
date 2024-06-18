import { ApiProperty } from '@nestjs/swagger';

export class GroupDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  note: string;
}
