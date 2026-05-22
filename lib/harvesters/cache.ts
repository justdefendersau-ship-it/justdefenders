/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\cache.ts
 *
 * Timestamp:
 * 21 May 2026 16:18 Sydney
 *
 * PURPOSE:
 * Supplier Federation Cache Layer
 *
 * STRATEGY:
 * PASS 24 — Real Supplier Ingestion Expansion
 *
 * ============================================================
 */

// ============================================================
// CACHE
// ============================================================

const cache =
  new Map()

const CACHE_TTL =
  1000 * 60 * 5

// ============================================================
// GET CACHE
// ============================================================

export function getCache(

  key: string

){

  const cached =
    cache.get(key)

  if (
    !cached
  ) {

    return null
  }

  const expired =

    Date.now()
    -
    cached.timestamp
    >
    CACHE_TTL

  if (
    expired
  ) {

    cache.delete(key)

    return null
  }

  return cached.data
}

// ============================================================
// SET CACHE
// ============================================================

export function setCache(

  key: string,

  data: unknown

){

  cache.set(

    key,

    {

      data,

      timestamp:
        Date.now()
    }
  )
}