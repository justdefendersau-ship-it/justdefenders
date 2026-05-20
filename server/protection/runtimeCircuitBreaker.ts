// JustDefenders ©
// File: C:\dev\justdefenders\frontend\server\protection\runtimeCircuitBreaker.ts
// Timestamp: 15 May 2026 00:25 Sydney

export interface CircuitBreakerOptions {

  failureThreshold?: number

  resetTimeoutMs?: number
}

export class RuntimeCircuitBreaker {

  private failures = 0

  private open = false

  private lastFailure = 0

  private readonly failureThreshold: number

  private readonly resetTimeoutMs: number

  constructor(
    options: CircuitBreakerOptions = {}
  ) {

    this.failureThreshold =
      options.failureThreshold ?? 5

    this.resetTimeoutMs =
      options.resetTimeoutMs ?? 30000
  }

  async execute<T>(
    operation: () => Promise<T>
  ): Promise<T> {

    /**
     * Open-circuit protection
     */
    if (this.open) {

      const elapsed =
        Date.now() -
        this.lastFailure

      if (
        elapsed <
        this.resetTimeoutMs
      ) {

        throw new Error(
          "Circuit breaker is OPEN"
        )
      }

      /**
       * Half-open reset
       */
      this.open = false

      this.failures = 0
    }

    try {

      const result =
        await operation()

      /**
       * Success reset
       */
      this.failures = 0

      return result

    } catch (err) {

      this.failures += 1

      this.lastFailure =
        Date.now()

      if (
        this.failures >=
        this.failureThreshold
      ) {

        this.open = true
      }

      throw err
    }
  }
}

/**
 * Shared runtime instance
 */
export const runtimeCircuitBreaker =
  new RuntimeCircuitBreaker({

    failureThreshold: 5,

    resetTimeoutMs: 30000
  })