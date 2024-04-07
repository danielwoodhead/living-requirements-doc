import { Inject, Injectable } from '@nestjs/common';
import { IArtifactService } from '../artifacts/artifact.service';
import { ShieldsIOBadge } from '../shieldsio/shieldsio.models';

@Injectable()
export class BadgeService {
  constructor(
    @Inject('IArtifactService')
    private readonly artifactService: IArtifactService,
  ) {}

  async getBadge(): Promise<ShieldsIOBadge> {
    const foo = await this.artifactService.getLatestArtifactContent(
      'test-results',
      'living-requirements-doc',
    );

    return {
      schemaVersion: 1,
      label: 'hello',
      message: foo,
    };
  }
}
