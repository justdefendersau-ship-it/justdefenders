/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\cacheLayer.ts

   Timestamp:
   2026-05-07 17:00

   Purpose:
   - Cache layer
   - Performance optimisation
===================================================== */

// =====================================================
// MEMORY CACHE
// =====================================================

const cache:any = {}

// =====================================================
// GET
// =====================================================

export function getCache(
  key:string
){

  const item =
    cache[key]

  if(!item){

    return null
  }

  // =====================================================
  // EXPIRY
  // =====================================================

  if(Date.now() > item.expiry){

    delete cache[key]

    return null
  }

  return item.value
}

// =====================================================
// SET
// =====================================================

export function setCache(

  key:string,

  value:any,

  ttlMs:number = 1000 * 60 * 5

){

  cache[key] = {

    value,

    expiry:
      Date.now() + ttlMs
  }
}
