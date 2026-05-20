/* =====================================================
   JustDefenders ©
   File:
   C:\dev\justdefenders\frontend\lib\securityHardening.ts

   Timestamp:
   2026-05-07 17:00

   Purpose:
   - Security hardening
   - Abuse prevention
===================================================== */

// =====================================================
// RATE LIMIT MEMORY
// =====================================================

const requests:any = {}

// =====================================================
// RATE LIMIT
// =====================================================

export function rateLimit(

  ip:string,

  limit:number = 60

){

  const now =
    Date.now()

  if(!requests[ip]){

    requests[ip] = []
  }

  // =====================================================
  // REMOVE OLD
  // =====================================================

  requests[ip] =

    requests[ip].filter(

      (t:number)=>

        now - t < 60000
    )

  // =====================================================
  // BLOCK
  // =====================================================

  if(

    requests[ip].length >= limit

  ){

    return false
  }

  requests[ip].push(now)

  return true
}
