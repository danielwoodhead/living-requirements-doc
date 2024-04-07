import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CachingArtifactService } from '../artifacts/artifact.service.caching';
import { GitHubArtifactService } from '../artifacts/artifact.service.github';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

@Module({
  imports: [],
  controllers: [BadgeController],
  providers: [
    BadgeService,
    GitHubArtifactService,
    {
      provide: 'IArtifactService',
      useFactory: (original: GitHubArtifactService, cacheManager: Cache) =>
        new CachingArtifactService(original, cacheManager),
      inject: [
        GitHubArtifactService,
        { token: CACHE_MANAGER, optional: false },
      ],
    },
  ],
})
export class BadgeModule {}
