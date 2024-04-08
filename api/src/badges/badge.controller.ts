import { Controller, Get, Query } from '@nestjs/common';
import { GetBadgeRequest, ShieldsIOBadge } from './badge.models';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  getBadge(@Query() request: GetBadgeRequest): Promise<ShieldsIOBadge> {
    return this.badgeService.getBadge(request);
  }
}
