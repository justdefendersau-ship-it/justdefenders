/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\SupplierResultsTable.tsx
 *
 * Timestamp:
 * 23 May 2026 11:04 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Federation Results Table
 *
 * STRATEGY:
 * PASS 33C — Procurement Intelligence Visualization
 *
 * OBJECTIVES:
 * - resilient federation rendering
 * - null-safe procurement rendering
 * - operational procurement visibility
 * - tactical federation intelligence
 * - expedition-aware procurement UX
 *
 * ============================================================
 */

"use client"

import {

  Shield,
  Truck,
  Gauge,
  Clock3,
  Activity,
  BadgeDollarSign,
  CheckCircle2,
  AlertTriangle

} from "lucide-react"

// ============================================================
// TYPES
// ============================================================

interface SupplierProduct {

  supplierName?: string

  brand?: string

  sku?: string

  title?: string

  price?: number

  procurementScore?: number

  deliveryEstimate?: string

  federationHealth?: string

  federationLatency?: number

  stockStatus?: string
}

interface SupplierResultsTableProps {

  products?:
    SupplierProduct[]
}

// ============================================================
// COMPONENT
// ============================================================

export default function SupplierResultsTable({

  products = []

}: SupplierResultsTableProps){

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !products.length

  ){

    return (

      <section
        className="
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
          p-10
        "
      >

        <div
          className="
            text-center
          "
        >

          <div
            className="
              text-[22px]
              font-black
              text-white
            "
          >
            No Procurement Results
          </div>

          <div
            className="
              mt-3
              text-[13px]
              text-slate-400
            "
          >
            Execute a federation procurement search to begin operational analysis.
          </div>

        </div>

      </section>
    )
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-slate-800
        bg-[#07101F]
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          border-b
          border-slate-800
          px-5
          py-4
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >

          <div>

            <div
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.22em]
                text-[#38BDF8]
              "
            >
              Operational Procurement Federation
            </div>

            <div
              className="
                mt-2
                text-[24px]
                font-black
                tracking-[-0.03em]
                text-white
              "
            >
              Tactical Supplier Intelligence
            </div>

          </div>

          <div
            className="
              rounded-2xl
              border
              border-slate-800
              bg-[#050C18]
              px-5
              py-3
            "
          >

            <div
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.14em]
                text-slate-500
              "
            >
              Results
            </div>

            <div
              className="
                mt-1
                text-[20px]
                font-black
                text-[#4ADE80]
              "
            >
              {products.length}
            </div>

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* TABLE */}
      {/* ==================================================== */}

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            min-w-full
          "
        >

          <thead
            className="
              border-b
              border-slate-800
              bg-[#050C18]
            "
          >

            <tr>

              <HeaderCell>
                Supplier
              </HeaderCell>

              <HeaderCell>
                Product
              </HeaderCell>

              <HeaderCell>
                Score
              </HeaderCell>

              <HeaderCell>
                Stock
              </HeaderCell>

              <HeaderCell>
                Delivery
              </HeaderCell>

              <HeaderCell>
                Health
              </HeaderCell>

              <HeaderCell>
                Latency
              </HeaderCell>

              <HeaderCell>
                Price
              </HeaderCell>

            </tr>

          </thead>

          <tbody>

            {

              products.map(

                (

                  product,
                  index

                ) => {

                  const supplierName =
                    product.supplierName
                    ?? "Unknown Supplier"

                  const brand =
                    product.brand
                    ?? "Unknown Brand"

                  const sku =
                    product.sku
                    ?? "UNKNOWN"

                  const title =
                    product.title
                    ?? "Unknown Product"

                  const price =
                    typeof product.price === "number"
                    ?
                    product.price
                    :
                    0

                  const procurementScore =
                    typeof product.procurementScore === "number"
                    ?
                    product.procurementScore
                    :
                    0

                  const deliveryEstimate =
                    product.deliveryEstimate
                    ?? "Unknown Delivery"

                  const federationHealth =
                    product.federationHealth
                    ?? "UNKNOWN"

                  const federationLatency =
                    typeof product.federationLatency === "number"
                    ?
                    product.federationLatency
                    :
                    0

                  const stockStatus =
                    product.stockStatus
                    ?? "Unknown"

                  return (

                    <tr
                      key={`${sku}-${index}`}
                      className="
                        border-b
                        border-slate-900
                        transition-all
                        hover:bg-[#0B1527]
                      "
                    >

                      {/* =================================== */}
                      {/* SUPPLIER */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-2xl
                              border
                              border-slate-800
                              bg-[#050C18]
                            "
                          >

                            <Truck
                              className="
                                h-5
                                w-5
                                text-[#60A5FA]
                              "
                            />

                          </div>

                          <div>

                            <div
                              className="
                                text-[14px]
                                font-black
                                text-white
                              "
                            >
                              {supplierName}
                            </div>

                            <div
                              className="
                                mt-1
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-slate-500
                              "
                            >
                              {brand}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* =================================== */}
                      {/* PRODUCT */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <div
                          className="
                            max-w-[320px]
                          "
                        >

                          <div
                            className="
                              text-[14px]
                              font-black
                              leading-snug
                              text-white
                            "
                          >
                            {title}
                          </div>

                          <div
                            className="
                              mt-2
                              flex
                              items-center
                              gap-2
                              text-[11px]
                              text-slate-500
                            "
                          >

                            <Shield
                              className="
                                h-3
                                w-3
                              "
                            />

                            SKU:
                            {sku}

                          </div>

                        </div>

                      </td>

                      {/* =================================== */}
                      {/* SCORE */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <div
                          className="
                            text-[22px]
                            font-black
                            tracking-[-0.04em]
                            text-[#4ADE80]
                          "
                        >
                          {procurementScore}
                        </div>

                      </td>

                      {/* =================================== */}
                      {/* STOCK */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <StatusBadge
                          value={stockStatus}
                        />

                      </td>

                      {/* =================================== */}
                      {/* DELIVERY */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-[13px]
                            font-semibold
                            text-slate-300
                          "
                        >

                          <Clock3
                            className="
                              h-4
                              w-4
                              text-[#60A5FA]
                            "
                          />

                          {deliveryEstimate}

                        </div>

                      </td>

                      {/* =================================== */}
                      {/* HEALTH */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <HealthBadge
                          value={federationHealth}
                        />

                      </td>

                      {/* =================================== */}
                      {/* LATENCY */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-[13px]
                            font-black
                            text-[#60A5FA]
                          "
                        >

                          <Activity
                            className="
                              h-4
                              w-4
                            "
                          />

                          {federationLatency}ms

                        </div>

                      </td>

                      {/* =================================== */}
                      {/* PRICE */}
                      {/* =================================== */}

                      <td
                        className="
                          px-5
                          py-4
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <BadgeDollarSign
                            className="
                              h-4
                              w-4
                              text-[#4ADE80]
                            "
                          />

                          <div
                            className="
                              text-[20px]
                              font-black
                              tracking-[-0.03em]
                              text-white
                            "
                          >
                            ${price.toFixed(2)}
                          </div>

                        </div>

                      </td>

                    </tr>
                  )
                }
              )
            }

          </tbody>

        </table>

      </div>

    </section>
  )
}

// ============================================================
// HEADER CELL
// ============================================================

function HeaderCell({

  children

}: {

  children: React.ReactNode

}){

  return (

    <th
      className="
        px-5
        py-4
        text-left
        text-[11px]
        font-black
        uppercase
        tracking-[0.18em]
        text-slate-500
      "
    >
      {children}
    </th>
  )
}

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({

  value

}: {

  value: string

}){

  const inStock =
    value
      .toLowerCase()
      .includes("stock")

  return (

    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        px-3
        py-2
        text-[11px]
        font-black
        uppercase
        tracking-[0.12em]

        ${
          inStock

          ?

          `
          border-[#14532D]
          bg-[#052E16]
          text-[#86EFAC]
          `

          :

          `
          border-[#7F1D1D]
          bg-[#450A0A]
          text-[#FCA5A5]
          `
        }
      `}
    >

      {

        inStock

        ?

        <CheckCircle2
          className="
            h-3.5
            w-3.5
          "
        />

        :

        <AlertTriangle
          className="
            h-3.5
            w-3.5
          "
        />
      }

      {value}

    </div>
  )
}

// ============================================================
// HEALTH BADGE
// ============================================================

function HealthBadge({

  value

}: {

  value: string

}){

  return (

    <div
      className={`
        inline-flex
        items-center
        rounded-xl
        px-3
        py-2
        text-[11px]
        font-black
        uppercase
        tracking-[0.12em]

        ${
          value === "HEALTHY"

          ?

          `
          bg-[#052E16]
          text-[#86EFAC]
          `

          :

          value === "DEGRADED"

          ?

          `
          bg-[#451A03]
          text-[#FCD34D]
          `

          :

          `
          bg-[#450A0A]
          text-[#FCA5A5]
          `
        }
      `}
    >
      {value}
    </div>
  )
}