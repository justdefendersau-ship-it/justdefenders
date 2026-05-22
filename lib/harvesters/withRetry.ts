/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\withRetry.ts
 *
 * Timestamp:
 * 21 May 2026 16:24 Sydney
 *
 * PURPOSE:
 * Federation Retry Wrapper
 *
 * STRATEGY:
 * PASS 25A — Federation Resilience Layer
 *
 * ============================================================
 */

// ============================================================
// RETRY WRAPPER
// ============================================================

export async function withRetry<T>(

  operation: () => Promise<T>,

  retries = 2,

  delay = 500

): Promise<T>{

  let lastError

  for (

    let attempt = 0;

    attempt <= retries;

    attempt++

  ){

    try {

      return await operation()

    } catch (

      err

    ) {

      lastError = err

      console.error(

        `Federation Retry Attempt ${attempt + 1} Failed`,

        err
      )

      if (
        attempt < retries
      ) {

        await new Promise(

          resolve =>

            setTimeout(
              resolve,
              delay
            )
        )
      }
    }
  }

  throw lastError
}