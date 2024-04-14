/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpModule } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { IArtifactService } from '../artifacts/artifact.service';
import { CachingArtifactService } from '../artifacts/artifact.service.caching';
import { GitHubArtifactService } from '../artifacts/artifact.service.github';
import { IBadgeClient } from './badge.client';
import { CachingBadgeClient } from './badge.client.caching';
import { ShieldsIOBadgeClient } from './badge.client.shieldsio';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

@Module({
  imports: [HttpModule],
  controllers: [BadgeController],
  providers: [
    BadgeService,
    GitHubArtifactService,
    ShieldsIOBadgeClient,
    {
      provide: 'IArtifactService',
      useFactory: (
        original: IArtifactService,
        cacheManager: Cache,
        configService: ConfigService,
      ) => new CachingArtifactService(original, cacheManager, configService),
      inject: [
        GitHubArtifactService,
        { token: CACHE_MANAGER, optional: false },
        ConfigService,
      ],
    },
    {
      provide: 'IBadgeClient',
      useFactory: (original: IBadgeClient, cacheManager: Cache) =>
        new CachingBadgeClient(original, cacheManager),
      inject: [ShieldsIOBadgeClient, { token: CACHE_MANAGER, optional: false }],
    },
  ],
})
export class BadgeModule {}
