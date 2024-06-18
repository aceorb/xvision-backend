import { GroupDto } from './group.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AddGroupDto extends GroupDto {
  @ApiProperty()
  userId: number;
}