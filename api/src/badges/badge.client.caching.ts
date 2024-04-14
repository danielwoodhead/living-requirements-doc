import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Mutex, MutexInterface } from 'async-mutex';
import { Cache } from 'cache-manager';
import { ThreadSafeCache } from '../caching/thread-safe.cache';
import { IBadgeClient } from './badge.client';

const lockMutex: MutexInterface = new Mutex();

export class CachingBadgeClient
  extends ThreadSafeCache
  implements IBadgeClient
{
  constructor(
    @Inject('IBadgeClient')
    private readonly badgeClient: IBadgeClient,
    @Inject(CACHE_MANAGER)
    cacheManager: Cache,
  ) {
    super(
      cacheManager,
      new Logger(CachingBadgeClient.name),
      {
        cacheTtlMs: 0,
        lockTimeoutMs: 10000,
        lockTtlMs: 0,
      },
      lockMutex,
    );
  }

  getBadge(
    label: string,
    message: string,
    color: string,
  ): Promise<ArrayBuffer> {
    const key = `BADGE#${label}#${message}#${color}`;
    return this.getItem<ArrayBuffer>(key, () =>
      this.badgeClient.getBadge(label, message, color),
    );
  }
}
