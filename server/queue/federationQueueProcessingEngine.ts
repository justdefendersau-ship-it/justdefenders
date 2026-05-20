// JustDefenders ©
// File: C:\dev\justdefenders\frontend\server\queue\federationQueueProcessingEngine.ts
// Timestamp: 15 May 2026 00:35 Sydney

export type QueueTask<T> =
  () => Promise<T>

export class FederationQueueProcessingEngine {

  private concurrency: number

  private running = 0

  private queue: Array<() => void> =
    []

  constructor(
    concurrency = 5
  ) {

    this.concurrency =
      concurrency
  }

  async add<T>(
    task: QueueTask<T>
  ): Promise<T> {

    return new Promise<T>(
      (
        resolve,
        reject
      ) => {

        const execute =
          async () => {

            this.running += 1

            try {

              const result =
                await task()

              resolve(result)

            } catch (err) {

              reject(err)

            } finally {

              this.running -= 1

              this.processNext()
            }
          }

        if (
          this.running <
          this.concurrency
        ) {

          execute()

        } else {

          this.queue.push(execute)
        }
      }
    )
  }

  private processNext():
  void {

    if (
      this.queue.length === 0
    ) {

      return
    }

    if (
      this.running >=
      this.concurrency
    ) {

      return
    }

    const next =
      this.queue.shift()

    if (next) {

      next()
    }
  }

  clear():
  void {

    this.queue = []
  }

  size():
  number {

    return this.queue.length
  }

  pending():
  number {

    return this.running
  }
}

export const federationQueue =
  new FederationQueueProcessingEngine(5)