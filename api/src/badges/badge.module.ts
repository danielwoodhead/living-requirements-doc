/* eslint-disable @typescript-eslint/no-unused-vars */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CachingArtifactService } from '../artifacts/artifact.service.caching';
import { GitHubArtifactService } from '../artifacts/artifact.service.github';
import { FakeJUnitXmlArtifactService } from '../artifacts/artifact.service.fake-junit-xml';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

@Module({
  imports: [],
  controllers: [BadgeController],
  providers: [
    BadgeService,
    //GitHubArtifactService,
    FakeJUnitXmlArtifactService,
    {
      provide: 'IArtifactService',
      useFactory: (
        original: FakeJUnitXmlArtifactService,
        cacheManager: Cache,
        configService: ConfigService,
      ) => new CachingArtifactService(original, cacheManager, configService),
      inject: [
        FakeJUnitXmlArtifactService,
        { token: CACHE_MANAGER, optional: false },
        ConfigService,
      ],
    },
  ],
})
export class BadgeModule {}
