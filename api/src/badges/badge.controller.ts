import { Controller, Get, Query } from '@nestjs/common';
import { GetBadgeRequest } from './badge.models';
import { BadgeService } from './badge.service';
import { ShieldsIOBadge } from '../shieldsio/shieldsio.models';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  getBadge(@Query() request: GetBadgeRequest): Promise<ShieldsIOBadge> {
    return this.badgeService.getBadge(request);
  }
}
