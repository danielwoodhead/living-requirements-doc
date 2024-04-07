import { Controller, Get } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { ShieldsIOBadge } from '../shieldsio/shieldsio.models';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  getBadge(): Promise<ShieldsIOBadge> {
    return this.badgeService.getBadge();
  }
}
