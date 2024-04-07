import { Module } from '@nestjs/common';
import { GitHubArtifactService } from '../artifacts/artifact.service.github';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

@Module({
  imports: [],
  controllers: [BadgeController],
  providers: [
    BadgeService,
    { provide: 'IArtifactService', useClass: GitHubArtifactService },
  ],
})
export class BadgeModule {}
