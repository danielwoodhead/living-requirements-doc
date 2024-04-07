import { Inject, Injectable } from '@nestjs/common';
import { IArtifactService } from '../artifacts/artifact.service';
import { ShieldsIOBadge } from '../shieldsio/shieldsio.models';
import { GetBadgeRequest } from './badge.models';

@Injectable()
export class BadgeService {
  constructor(
    @Inject('IArtifactService')
    private readonly artifactService: IArtifactService,
  ) {}

  async getBadge(request: GetBadgeRequest): Promise<ShieldsIOBadge> {
    const artifactContent = await this.artifactService.getLatestArtifactContent(
      request.artifactName,
      request.fileName,
      request.repo,
      request.owner,
    );

    return {
      schemaVersion: 1,
      label: 'hello',
      message: artifactContent,
    };
  }
}
