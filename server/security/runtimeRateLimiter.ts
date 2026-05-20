// JustDefenders ©
// File: C:\dev\justdefenders\frontend\server\security\runtimeRateLimiter.ts
// Timestamp: 15 May 2026 00:55 Sydney

export interface RateLimitResult {

  allowed: boolean

  remaining: number

  resetAt: number
}

interface RuntimeRateLimitEntry {

  count: number

  resetAt: number
}

class RuntimeRateLimiter {

  private readonly windowMs: number

  private readonly maxRequests: number

  private readonly store:
    Map<string, RuntimeRateLimitEntry>

  constructor(
    windowMs = 60_000,
    maxRequests = 100
  ) {

    this.windowMs =
      windowMs

    this.maxRequests =
      maxRequests

    this.store =
      new Map()
  }

  check(
    identifier: string
  ): RateLimitResult {

    const now =
      Date.now()

    const existing =
      this.store.get(identifier)

    /**
     * Create new window
     */
    if (
      !existing ||
      now > existing.resetAt
    ) {

      const resetAt =
        now + this.windowMs

      this.store.set(
        identifier,
        {
          count: 1,
          resetAt
        }
      )

      return {

        allowed: true,

        remaining:
          this.maxRequests - 1,

        resetAt
      }
    }

    /**
     * Limit exceeded
     */
    if (
      existing.count >=
      this.maxRequests
    ) {

      return {

        allowed: false,

        remaining: 0,

        resetAt:
          existing.resetAt
      }
    }

    existing.count += 1

    this.store.set(
      identifier,
      existing
    )

    return {

      allowed: true,

      remaining:
        this.maxRequests -
        existing.count,

      resetAt:
        existing.resetAt
    }
  }

  clear():
  void {

    this.store.clear()
  }
}

export const runtimeRateLimiter =
  new RuntimeRateLimiter()