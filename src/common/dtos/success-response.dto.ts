import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  constructor(success = true) {
    this.success = success;
  }
}