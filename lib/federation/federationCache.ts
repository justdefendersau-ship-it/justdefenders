/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\federation\federationCache.ts
 *
 * Timestamp:
 * 21 May 2026 21:44 Sydney
 *
 * PURPOSE:
 * Federation Memory Cache
 *
 * STRATEGY:
 * PASS 27B — Federation Resilience + Timeout Protection
 *
 * ============================================================
 */

interface CacheEntry<T> {

  value: T

  expiresAt: number
}

const federationCache =
  new Map<string, CacheEntry<any>>()

const DEFAULT_TTL_MS =
  1000 * 60 * 2

export function getFederationCache<T>(

  key: string

): T | null {

  const entry =
    federationCache.get(key)

  if (!entry){

    return null
  }

  if (

    Date.now() >
    entry.expiresAt

  ){

    federationCache.delete(key)

    return null
  }

  return entry.value as T
}

export function setFederationCache<T>(

  key: string,

  value: T,

  ttlMs = DEFAULT_TTL_MS

){

  federationCache.set(

    key,

    {

      value,

      expiresAt:
        Date.now() + ttlMs
    }
  )
}