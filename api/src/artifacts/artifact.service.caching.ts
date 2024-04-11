import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Mutex, MutexInterface, withTimeout } from 'async-mutex';
import { Cache } from 'cache-manager';
import { IArtifactService } from '../artifacts/artifact.service';
import { ConfigService } from '@nestjs/config';

const lockMutex: MutexInterface = new Mutex();

@Injectable()
export class CachingArtifactService implements IArtifactService {
  private readonly logger = new Logger(CachingArtifactService.name);

  constructor(
    @Inject('IArtifactService')
    private readonly artifactService: IArtifactService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  private getKey(
    type: string,
    artifactName: string,
    fileName: string,
    repo: string,
    owner: string,
  ): string {
    return `${type}#${owner}#${repo}#${artifactName}#${fileName}`;
  }

  async getLatestArtifactFile(
    artifactName: string,
    fileName: string,
    repo: string,
    owner: string,
  ): Promise<string> {
    const key = this.getKey('ARTIFACT', artifactName, fileName, repo, owner);
    const cached = await this.cacheManager.get<string>(key);
    if (cached) {
      return cached;
    }

    const lock: MutexInterface = await lockMutex.runExclusive(() => {
      const key = this.getKey('LOCK', artifactName, fileName, repo, owner);
      return this.cacheManager.wrap<MutexInterface>(
        key,
        () => {
          this.logger.log(`Refreshing lock for key: ${key}`);
          return Promise.resolve(
            withTimeout(
              new Mutex(),
              this.configService.get<number>(
                'ARTIFACT_CACHE_LOCK_TIMEOUT_MS',
                10000,
              ),
            ),
          );
        },
        this.configService.get<number>('ARTIFACT_CACHE_LOCK_TTL_MS', 60000),
        this.configService.get<number>('ARTIFACT_CACHE_LOCK_REFRESH_MS', 50000),
      );
    });

    return lock.runExclusive(() =>
      this.cacheManager.wrap<string>(
        key,
        () => {
          this.logger.log(`Cache miss for key: ${key}`);
          return this.artifactService.getLatestArtifactFile(
            artifactName,
            fileName,
            repo,
            owner,
          );
        },
        this.configService.get<number>('ARTIFACT_CACHE_TTL_MS', 10000),
      ),
    );
  }
}
