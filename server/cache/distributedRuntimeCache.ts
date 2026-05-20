// JustDefenders ©
// File: C:\dev\justdefenders\frontend\server\cache\distributedRuntimeCache.ts
// Timestamp: 15 May 2026 00:05 Sydney

type CacheEntry<T> = {

  value: T

  expiresAt: number
}

class DistributedRuntimeCache {

  private cache:
    Map<string, CacheEntry<unknown>>

  constructor() {

    this.cache = new Map()
  }

  set<T>(
    key: string,
    value: T,
    ttlSeconds = 300
  ): void {

    this.cache.set(
      key,
      {
        value,
        expiresAt:
          Date.now() +
          ttlSeconds * 1000
      }
    )
  }

  get<T>(
    key: string
  ): T | undefined {

    const entry =
      this.cache.get(key)

    if (!entry) {
      return undefined
    }

    if (
      Date.now() >
      entry.expiresAt
    ) {

      this.cache.delete(key)

      return undefined
    }

    return entry.value as T
  }

  del(
    key: string
  ): void {

    this.cache.delete(key)
  }

  flushAll(): void {

    this.cache.clear()
  }
}

export const distributedCache =
  new DistributedRuntimeCache()