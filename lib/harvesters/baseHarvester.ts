/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\lib\harvesters\baseHarvester.ts
 *
 * Timestamp:
 * 21 May 2026 21:44 Sydney
 *
 * PURPOSE:
 * Federation Base Harvester
 *
 * STRATEGY:
 * PASS 27B — Federation Resilience + Timeout Protection
 *
 * ============================================================
 */

import {

  NormalizedSupplierProduct,
  SupplierHealth

} from "@/lib/procurement/types"

export interface SupplierSearchParams {

  query: string

  vehicleModel?: string

  engine?: string

  year?: string
}

export abstract class BaseHarvester {

  abstract supplierId: string

  abstract supplierName: string

  abstract search(

    params: SupplierSearchParams

  ): Promise<NormalizedSupplierProduct[]>

  protected buildTimestamp(): string {

    return new Date().toISOString()
  }

  protected randomLatency(): number {

    return Math.floor(
      Math.random() * 500
    ) + 100
  }

  protected determineHealth(

    latency: number

  ): SupplierHealth {

    if (latency < 700){

      return "HEALTHY"
    }

    if (latency < 1400){

      return "DEGRADED"
    }

    return "TIMEOUT"
  }

  protected async withTimeout<T>(

    promise: Promise<T>,

    timeoutMs: number

  ): Promise<T> {

    let timeoutHandle:
    NodeJS.Timeout

    const timeoutPromise =
      new Promise<never>(

        (_, reject) => {

          timeoutHandle =
            setTimeout(

              () => {

                reject(

                  new Error(
                    "SUPPLIER_TIMEOUT"
                  )
                )

              },

              timeoutMs
            )
        }
      )

    return Promise.race([

      promise,

      timeoutPromise

    ]).finally(() => {

      clearTimeout(timeoutHandle)
    }) as Promise<T>
  }
}