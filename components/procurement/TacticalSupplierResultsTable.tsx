/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\TacticalSupplierResultsTable.tsx
 *
 * Timestamp:
 * 21 May 2026 15:08 Sydney
 *
 * PURPOSE:
 * Tactical Supplier Results Table
 *
 * STRATEGY:
 * PASS 22 — Operational Procurement Density Restoration
 *
 * OBJECTIVE:
 * Restore target-state operational procurement density
 * while preserving:
 * - live ingestion
 * - telemetry
 * - mobile support
 * - stability hardening
 *
 * ============================================================
 */

"use client"

import {
  useEffect,
  useRef,
  useState
} from "react"

import Link from "next/link"

import Image from "next/image"

import {
  ShieldCheck,
  Truck,
  PackageCheck,
  Loader2,
  AlertTriangle,
  Wrench,
  Clock3,
  BadgeCheck,
  Globe
} from "lucide-react"

import {
  trackEvent
} from "@/lib/telemetry/trackEvent"

// ============================================================
// TYPES
// ============================================================

interface SupplierProduct {

  supplier: string

  brand: string

  title: string

  sku: string

  category: string

  url: string

  price: number

  inStock: boolean

  expeditionReady: boolean

  procurementScore: number

  fitmentScore: number

  deliveryEstimate: string
}

interface Props {

  searchTerm: string
}

// ============================================================
// LOGOS
// ============================================================

const supplierLogos:
  Record<string, string> = {

  Repco:
    "/suppliers/repco.png",

  "Burson Auto Parts":
    "/suppliers/burson.png"
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalSupplierResultsTable({

  searchTerm

}: Props){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    loading,

    setLoading

  ] = useState(true)

  const [

    products,

    setProducts

  ] = useState<
    SupplierProduct[]
  >([])

  const [

    error,

    setError

  ] = useState("")

  const debounceRef =
    useRef<NodeJS.Timeout | null>(
      null
    )

  // ==========================================================
  // LOAD LIVE DATA
  // ==========================================================

  useEffect(() => {

    if (
      debounceRef.current
    ) {

      clearTimeout(
        debounceRef.current
      )
    }

    debounceRef.current =
      setTimeout(async () => {

        try {

          setLoading(true)

          setError("")

          trackEvent({

            event:
              "procurement_search",

            metadata: {

              searchTerm
            }
          })

          const response =

            await fetch(

              `/api/search/live?q=${searchTerm}`
            )

          if (
            !response.ok
          ) {

            throw new Error(
              "Live procurement search failed"
            )
          }

          const data =
            await response.json()

          setProducts(

            data.products || []
          )

          trackEvent({

            event:
              "procurement_results_loaded",

            metadata: {

              searchTerm,

              productCount:
                data.products?.length || 0
            }
          })

        } catch (

          err

        ) {

          console.error(

            "LIVE PROCUREMENT FAILURE",

            err
          )

          setError(

            "Operational procurement ingestion unavailable."
          )

          trackEvent({

            event:
              "procurement_ingestion_failure",

            metadata: {

              searchTerm
            }
          })

        } finally {

          setLoading(false)
        }

      }, 350)

    return () => {

      if (
        debounceRef.current
      ) {

        clearTimeout(
          debounceRef.current
        )
      }
    }

  }, [searchTerm])

  // ==========================================================
  // LOADING
  // ==========================================================

  if (
    loading
  ) {

    return (

      <div
        className="
          flex
          min-h-[320px]
          items-center
          justify-center
          rounded-[32px]
          border
          border-slate-800
          bg-[#081122]
          p-20
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
            text-slate-300
          "
        >

          <Loader2
            className="
              h-6
              w-6
              animate-spin
            "
          />

          Loading operational procurement intelligence...

        </div>

      </div>
    )
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (
    error
  ) {

    return (

      <div
        className="
          rounded-[32px]
          border
          border-red-900
          bg-[#1A0B0B]
          p-10
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <AlertTriangle
            className="
              mt-0.5
              h-6
              w-6
              text-red-300
            "
          />

          <div>

            <div
              className="
                text-xl
                font-black
                text-red-300
              "
            >
              Procurement Federation Offline
            </div>

            <div
              className="
                mt-2
                text-slate-300
              "
            >
              {error}
            </div>

          </div>

        </div>

      </div>
    )
  }

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (
    products.length === 0
  ) {

    return (

      <div
        className="
          rounded-[32px]
          border
          border-slate-800
          bg-[#081122]
          p-16
          text-center
        "
      >

        <div
          className="
            text-2xl
            font-black
            text-white
          "
        >
          No Procurement Results
        </div>

        <div
          className="
            mt-3
            text-slate-400
          "
        >
          No live supplier matches found.
        </div>

      </div>
    )
  }

  // ==========================================================
  // GROUP SUPPLIERS
  // ==========================================================

  const groupedSuppliers =
    Object.values(

      products.reduce((

        acc,

        product

      ) => {

        if (
          !acc[
            product.supplier
          ]
        ) {

          acc[
            product.supplier
          ] = {

            supplier:
              product.supplier,

            products: []
          }
        }

        acc[
          product.supplier
        ].products.push(product)

        return acc

      }, {} as Record<string, {

        supplier: string

        products:
          SupplierProduct[]

      }>)
    )

  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div
      className="
        space-y-6
      "
    >

      {

        groupedSuppliers.map(

          supplierGroup => {

            const lead =
              supplierGroup.products[0]

            return (

              <div
                key={lead.supplier}
                className="
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-slate-800
                  bg-[#07101F]
                  shadow-[0_0_40px_rgba(37,99,235,0.08)]
                "
              >

                {/* ====================================== */}
                {/* SUPPLIER HEADER */}
                {/* ====================================== */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-start
                    justify-between
                    gap-8
                    border-b
                    border-slate-900
                    px-7
                    py-6
                  "
                >

                  {/* LEFT */}

                  <div
                    className="
                      flex
                      gap-5
                    "
                  >

                    {/* LOGO */}

                    <div
                      className="
                        relative
                        h-20
                        w-20
                        overflow-hidden
                        rounded-2xl
                        bg-white
                        shadow-lg
                      "
                    >

                      <Image
                        src={
                          supplierLogos[
                            lead.supplier
                          ]
                          ||
                          "/suppliers/default.png"
                        }
                        alt={lead.supplier}
                        fill
                        className="
                          object-contain
                          p-2
                        "
                      />

                    </div>

                    {/* DETAILS */}

                    <div>

                      <div
                        className="
                          text-[15px]
                          font-black
                          uppercase
                          tracking-[0.22em]
                          text-[#38BDF8]
                        "
                      >
                        {lead.supplier}
                      </div>

                      <div
                        className="
                          mt-1
                          text-[34px]
                          font-black
                          leading-none
                          text-white
                        "
                      >
                        Procurement Results
                      </div>

                      <div
                        className="
                          mt-2
                          text-sm
                          text-slate-400
                        "
                      >
                        Defender 110 300Tdi
                        •
                        1994-1998
                      </div>

                      {/* STATUS CHIPS */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            rounded-full
                            bg-[#123B2A]
                            px-4
                            py-2
                            text-sm
                            font-black
                            text-[#4ADE80]
                          "
                        >
                          {lead.fitmentScore}% Fitment
                        </div>

                        <div
                          className="
                            rounded-full
                            border
                            border-[#1D4ED8]
                            bg-[#081122]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#60A5FA]
                          "
                        >
                          OEM Compatible
                        </div>

                        <div
                          className="
                            rounded-full
                            border
                            border-[#14532D]
                            bg-[#052E16]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#4ADE80]
                          "
                        >
                          Operational Stock
                        </div>

                        <div
                          className="
                            rounded-full
                            border
                            border-[#581C87]
                            bg-[#1E1033]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#D8B4FE]
                          "
                        >
                          Fast Delivery
                        </div>

                        <div
                          className="
                            rounded-full
                            border
                            border-[#1D4ED8]
                            bg-[#081122]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#60A5FA]
                          "
                        >
                          Procurement {lead.procurementScore}
                        </div>

                        {

                          lead.expeditionReady

                          &&

                          <div
                            className="
                              rounded-full
                              border
                              border-[#5B3A00]
                              bg-[#1B1307]
                              px-4
                              py-2
                              text-sm
                              font-bold
                              text-[#FBBF24]
                            "
                          >
                            Expedition Ready
                          </div>
                        }

                        <div
                          className="
                            rounded-full
                            border
                            border-[#7F1D1D]
                            bg-[#220A0A]
                            px-4
                            py-2
                            text-sm
                            font-bold
                            text-[#FB7185]
                          "
                        >
                          Verified Supplier
                        </div>

                      </div>

                      {/* META */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-5
                          text-sm
                          text-slate-400
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <Wrench
                            className="
                              h-4
                              w-4
                            "
                          />

                          Physical

                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <Clock3
                            className="
                              h-4
                              w-4
                            "
                          />

                          {lead.deliveryEstimate}

                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <BadgeCheck
                            className="
                              h-4
                              w-4
                            "
                          />

                          High Confidence

                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <Globe
                            className="
                              h-4
                              w-4
                            "
                          />

                          AU Federation

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* PRICE */}

                  <div
                    className="
                      text-right
                    "
                  >

                    <div
                      className="
                        text-[62px]
                        font-black
                        leading-none
                        text-[#4ADE80]
                      "
                    >
                      ${lead.price}
                    </div>

                    <div
                      className="
                        mt-1
                        text-sm
                        text-slate-400
                      "
                    >
                      Club Price
                    </div>

                  </div>

                </div>

                {/* ====================================== */}
                {/* TABLE */}
                {/* ====================================== */}

                <div
                  className="
                    overflow-x-auto
                  "
                >

                  <table
                    className="
                      w-full
                      min-w-[900px]
                    "
                  >

                    <thead
                      className="
                        bg-[#050C18]
                      "
                    >

                      <tr>

                        <th
                          className="
                            px-7
                            py-4
                            text-left
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.22em]
                            text-slate-500
                          "
                        >
                          Brand
                        </th>

                        <th
                          className="
                            px-7
                            py-4
                            text-left
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.22em]
                            text-slate-500
                          "
                        >
                          Part
                        </th>

                        <th
                          className="
                            px-7
                            py-4
                            text-left
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.22em]
                            text-slate-500
                          "
                        >
                          OEM Score
                        </th>

                        <th
                          className="
                            px-7
                            py-4
                            text-left
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.22em]
                            text-slate-500
                          "
                        >
                          Club
                        </th>

                        <th
                          className="
                            px-7
                            py-4
                            text-left
                            text-xs
                            font-black
                            uppercase
                            tracking-[0.22em]
                            text-slate-500
                          "
                        >
                          Delivery
                        </th>

                        <th
                          className="
                            px-7
                            py-4
                          "
                        />

                      </tr>

                    </thead>

                    <tbody>

                      {

                        supplierGroup.products.map(

                          (
                            product,
                            index
                          ) => (

                            <tr
                              key={`${product.sku}-${index}`}
                              className="
                                border-t
                                border-slate-900
                              "
                            >

                              <td
                                className="
                                  px-7
                                  py-5
                                  text-lg
                                  font-bold
                                  text-white
                                "
                              >
                                {product.brand}
                              </td>

                              <td
                                className="
                                  px-7
                                  py-5
                                "
                              >

                                <div
                                  className="
                                    text-[20px]
                                    font-black
                                    text-[#38BDF8]
                                  "
                                >
                                  {product.sku}
                                </div>

                                <div
                                  className="
                                    mt-1
                                    text-sm
                                    text-slate-400
                                  "
                                >
                                  {product.title}
                                </div>

                              </td>

                              <td
                                className="
                                  px-7
                                  py-5
                                  text-[28px]
                                  font-black
                                  text-[#60A5FA]
                                "
                              >
                                {product.procurementScore}
                              </td>

                              <td
                                className="
                                  px-7
                                  py-5
                                "
                              >

                                <div
                                  className="
                                    text-[28px]
                                    font-black
                                    text-[#4ADE80]
                                  "
                                >
                                  ${product.price}
                                </div>

                              </td>

                              <td
                                className="
                                  px-7
                                  py-5
                                  text-lg
                                  text-white
                                "
                              >
                                {product.deliveryEstimate}
                              </td>

                              <td
                                className="
                                  px-7
                                  py-5
                                "
                              >

                                <div
                                  className="
                                    flex
                                    justify-end
                                    gap-3
                                  "
                                >

                                  <Link

                                    href={`/parts/intelligence/${product.sku}`}

                                    onClick={() =>

                                      trackEvent({

                                        event:
                                          "part_intelligence_opened",

                                        metadata: {

                                          sku:
                                            product.sku,

                                          supplier:
                                            product.supplier
                                        }
                                      })

                                    }

                                    className="
                                      rounded-2xl
                                      border
                                      border-slate-700
                                      px-5
                                      py-3
                                      text-sm
                                      font-bold
                                      text-slate-300
                                    "
                                  >
                                    Intelligence
                                  </Link>

                                  <Link

                                    href={`/supplier/${product.supplier
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                    }`}

                                    onClick={() =>

                                      trackEvent({

                                        event:
                                          "supplier_workspace_opened",

                                        metadata: {

                                          supplier:
                                            product.supplier
                                        }
                                      })

                                    }

                                    className="
                                      rounded-2xl
                                      bg-[#2563EB]
                                      px-5
                                      py-3
                                      text-sm
                                      font-black
                                      text-white
                                    "
                                  >
                                    View Supplier
                                  </Link>

                                </div>

                              </td>

                            </tr>
                          )
                        )
                      }

                    </tbody>

                  </table>

                </div>

              </div>
            )
          }
        )
      }

    </div>
  )
}