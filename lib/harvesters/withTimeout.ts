/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\withTimeout.ts
 *
 * Timestamp:
 * 21 May 2026 16:42 Sydney
 *
 * PURPOSE:
 * Federation Timeout Protection
 *
 * STRATEGY:
 * PASS 25B — Federation Timeout + Performance Protection
 *
 * ============================================================
 */

// ============================================================
// TIMEOUT WRAPPER
// ============================================================

export async function withTimeout<T>(

  operation: () => Promise<T>,

  timeoutMs = 2500,

  supplier = "Unknown Supplier"

): Promise<T>{

  return Promise.race([

    operation(),

    new Promise<T>((_, reject) =>

      setTimeout(() => {

        reject(

          new Error(

            `${supplier} federation timeout after ${timeoutMs}ms`
          )
        )

      }, timeoutMs)
    )
  ])
}