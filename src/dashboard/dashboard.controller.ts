import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { OverviewDto } from './dtos/overview.dto';
import { EventDto } from './dtos/event.dto';

@Controller('dashboard')
@ApiTags('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {
  }

  @ApiBearerAuth()
  @Get('overview')
  @ApiOkResponse({ type: OverviewDto })
  async overview(@Request() request): Promise<OverviewDto> {
    const userId = request.user.id;
    return await this.dashboardService.getOverview(userId);
  }

  @ApiBearerAuth()
  @Get('events')
  @ApiOkResponse({ type: EventDto, isArray: true })
  async events(@Request() request): Promise<EventDto[]> {
    const userId = request.user.id;
    return await this.dashboardService.getEvents(userId);
  }
}
