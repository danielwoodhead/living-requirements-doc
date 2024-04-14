import {
  Controller,
  Get,
  Header,
  Logger,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { GetBadgeRequest } from './badge.models';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
  private readonly logger = new Logger(BadgeController.name);

  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  @Header('cache-control', 'max-age=300, s-maxage=300')
  @Header('content-type', 'image/svg+xml;charset=utf-8')
  async getBadge(@Query() request: GetBadgeRequest): Promise<StreamableFile> {
    this.logger.log('GET /badge start');
    const badge = await this.badgeService.getBadge(request);
    return new StreamableFile(new Uint8Array(badge));
  }
}
