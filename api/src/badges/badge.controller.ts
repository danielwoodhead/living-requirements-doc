import { Controller, Get, Header, Query, StreamableFile } from '@nestjs/common';
import { GetBadgeRequest } from './badge.models';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  @Header('cache-control', 'max-age=300, s-maxage=300')
  @Header('content-type', 'image/svg+xml;charset=utf-8')
  async getBadge(@Query() request: GetBadgeRequest): Promise<StreamableFile> {
    const badge = await this.badgeService.getBadge(request);
    return new StreamableFile(new Uint8Array(badge));
  }
}
