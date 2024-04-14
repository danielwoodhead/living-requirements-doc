import { Logger } from '@nestjs/common';
import { Mutex, MutexInterface, withTimeout } from 'async-mutex';
import { Cache } from 'cache-manager';

export class ThreadSafeCacheOptions {
  cacheTtlMs: number;
  lockTimeoutMs: number;
  lockTtlMs: number;
  lockRefreshMs?: number;
}

export abstract class ThreadSafeCache {
  protected constructor(
    private readonly cacheManager: Cache,
    private readonly logger: Logger,
    private readonly options: ThreadSafeCacheOptions,
    private readonly lockMutex: MutexInterface,
  ) {}

  async getItem<T>(key: string, func: () => Promise<T>): Promise<T> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) {
      return cached;
    }

    const lock: MutexInterface = await this.lockMutex.runExclusive(() => {
      const lockKey = `LOCK#${key}`;
      return this.cacheManager.wrap<MutexInterface>(
        lockKey,
        () => {
          this.logger.log(`Refreshing lock for key: ${key}`);
          return Promise.resolve(
            withTimeout(new Mutex(), this.options.lockTimeoutMs),
          );
        },
        this.options.lockTtlMs,
        this.options.lockRefreshMs,
      );
    });

    return lock.runExclusive(() =>
      this.cacheManager.wrap<T>(
        key,
        () => {
          this.logger.log(`Cache miss for key: ${key}`);
          return func();
        },
        this.options.cacheTtlMs,
      ),
    );
  }
}
