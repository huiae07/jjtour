import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache, Milliseconds } from 'cache-manager';
const DEFAULT_TTL = 60 * 60 * 1000;

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cache.get(key);
  }

  async set(
    key: string,
    value: any,
    ttl: Milliseconds = DEFAULT_TTL,
  ): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async reset(): Promise<void> {
    await this.cache.reset();
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }
}
