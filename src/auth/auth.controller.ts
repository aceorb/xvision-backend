import { BadRequestException, Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './entities/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenResponse } from './dtos/token-response.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/user.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { compare } from 'bcrypt';
import { SuccessResponseDto } from '../common/dtos/success-response.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
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
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    return user.toDto();
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: () => UserDto })
  async updateProfile(@Request() req, @Body() body: UpdateProfileDto): Promise<UserDto> {
    const user = await this.usersService.update(req.user.id, body);
    return user.toDto();
  }

  @Post('change-password')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: () => SuccessResponseDto })
  async changePassword(@Request() req, @Body() body: ChangePasswordDto): Promise<SuccessResponseDto> {
    const user = await this.usersService.findById(req.user.id);
    const matched = await compare(body.oldPassword, user.password);
    if (!matched) {
      throw new BadRequestException('Incorrect old password');
    }
    user.password = body.newPassword;
    await user.preProcess();
    await this.usersService.updateUser(user);
    return new SuccessResponseDto();
  }

  @Post('register')
  @ApiOkResponse({ type: () => TokenResponse })
  async register(@Body() body: RegisterUserDto): Promise<TokenResponse> {
    const user = await this.authService.addUser(body.name, body.email, body.password);
    return this.authService.login(user);
  }
}
