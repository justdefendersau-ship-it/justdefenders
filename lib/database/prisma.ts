/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\database\prisma.ts
 *
 * Timestamp:
 * 24 May 2026 17:02 Sydney
 *
 * PURPOSE:
 * Prisma Singleton Runtime
 *
 * PASS 47.5
 * Persistent Deployment Infrastructure Layer
 *
 * ============================================================
 */

import {

  PrismaClient

} from "@prisma/client"

// ============================================================
// GLOBAL
// ============================================================

declare global {

  // eslint-disable-next-line no-var
  var prisma:
    | PrismaClient
    | undefined
}

// ============================================================
// CLIENT
// ============================================================

export const prisma =

  global.prisma

  ||

  new PrismaClient({

    log:

      process.env.NODE_ENV === "development"

      ?

      [
        "query",
        "error",
        "warn"
      ]

      :

      [
        "error"
      ]
  })

// ============================================================
// DEVELOPMENT CACHE
// ============================================================

if(

  process.env.NODE_ENV !== "production"
){

  global.prisma = prisma
}