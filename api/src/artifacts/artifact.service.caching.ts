import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IArtifactService } from '../artifacts/artifact.service';

@Injectable()
export class CachingArtifactService implements IArtifactService {
  private readonly ttlMilliseconds = 10 * 1000;

  constructor(
    @Inject('IArtifactService')
    private readonly artifactService: IArtifactService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  getLatestArtifactContent(
    artifactName: string,
    fileName: string,
    repo: string,
    owner: string,
  ): Promise<string> {
    const cacheKey = `ARTIFACT#${owner}#${repo}#${artifactName}`;
    return this.cacheManager.wrap(
      cacheKey,
      () =>
        this.artifactService.getLatestArtifactContent(
          artifactName,
          fileName,
          repo,
          owner,
        ),
      this.ttlMilliseconds,
    );
  }
}
