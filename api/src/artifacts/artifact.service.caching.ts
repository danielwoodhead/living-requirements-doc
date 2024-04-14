import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mutex, MutexInterface } from 'async-mutex';
import { Cache } from 'cache-manager';
import { IArtifactService } from '../artifacts/artifact.service';
import { ThreadSafeCache } from '../caching/thread-safe.cache';

const lockMutex: MutexInterface = new Mutex();

export class CachingArtifactService
  extends ThreadSafeCache
  implements IArtifactService
{
  constructor(
    @Inject('IArtifactService')
    private readonly artifactService: IArtifactService,
    @Inject(CACHE_MANAGER)
    cacheManager: Cache,
    configService: ConfigService,
  ) {
    super(
      cacheManager,
      new Logger(CachingArtifactService.name),
      {
        cacheTtlMs: configService.get<number>('ARTIFACT_CACHE_TTL_MS', 10000),
        lockTimeoutMs: configService.get<number>(
          'ARTIFACT_CACHE_LOCK_TIMEOUT_MS',
          10000,
        ),
        lockTtlMs: configService.get<number>(
          'ARTIFACT_CACHE_LOCK_TTL_MS',
          60000,
        ),
        lockRefreshMs: configService.get<number>(
          'ARTIFACT_CACHE_LOCK_REFRESH_MS',
          50000,
        ),
      },
      lockMutex,
    );
  }

  getLatestArtifactFile(
    artifactName: string,
    fileName: string,
    repo: string,
    owner: string,
  ): Promise<string> {
    const key = `ARTIFACT#${owner}#${repo}#${artifactName}#${fileName}`;
    return this.getItem<string>(key, () =>
      this.artifactService.getLatestArtifactFile(
        artifactName,
        fileName,
        repo,
        owner,
      ),
    );
  }
}
