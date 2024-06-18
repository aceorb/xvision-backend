import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './entities/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenResponse } from './dtos/token-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({ type: () => TokenResponse })
  async login(@Request() req, @Body() body: LoginDto) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @ApiOkResponse({ type: () => TokenResponse })
  async register(@Body() body: RegisterUserDto): Promise<TokenResponse> {
    const user = await this.authService.addUser(body.name, body.email, body.password);
    return this.authService.login(user);
  }
}
