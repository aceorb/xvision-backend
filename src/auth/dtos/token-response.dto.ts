import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({ description: 'access token' })
  accessToken: string;
}