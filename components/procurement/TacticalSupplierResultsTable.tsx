/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\TacticalSupplierResultsTable.tsx
 *
 * Timestamp:
 * 20 May 2026 12:05 Sydney
 * ============================================================
 */

"use client"

import React, {
  useEffect,
  useState
} from "react"

import Image from "next/image"

import {
  Shield,
  Truck,
  MapPin,
  ExternalLink
} from "lucide-react"

import TacticalCard from "@/components/ui/tactical/TacticalCard"

import {
  buildSupplierTable
} from "@/lib/procurement/buildSupplierTable"

interface ProcurementProduct {

  supplier: string

  title: string

  brand?: string

  sku?: string

  category?: string

  url?: string

  expeditionReady?: boolean

  inStock?: boolean

  procurementScore?: number
}

interface TacticalSupplier {

  supplierName: string

  location: string

  operationalStock: boolean

  expeditionReady: boolean

  verifiedSupplier: boolean

  procurementScore: number

  federationPrice: number

  products: ProcurementProduct[]
}

interface TacticalSupplierResultsTableProps {

  searchTerm: string
}

export default function TacticalSupplierResultsTable({

  searchTerm

}: TacticalSupplierResultsTableProps) {

  const [
    suppliers,
    setSuppliers
  ] = useState<
    TacticalSupplier[]
  >([])

  const [
    loading,
    setLoading
  ] = useState(false)

  useEffect(()=>{

    async function loadLiveFederation() {

      try {

        setLoading(true)

        console.log(
          "TACTICAL FEDERATION SEARCH",
          searchTerm
        )

        const response =
          await fetch(
            `/api/harvester/repco?q=${encodeURIComponent(searchTerm)}`
          )

        const data =
          await response.json()

        console.log(
          "LIVE REPCO PRODUCTS",
          data.products
        )

        const tacticalSuppliers =
          buildSupplierTable(
            data.products || []
          )

        console.log(
          "TACTICAL SUPPLIERS",
          tacticalSuppliers
        )

        setSuppliers(
          tacticalSuppliers
        )

      } catch (err) {

        console.error(
          "TACTICAL FEDERATION FAILURE",
          err
        )

      } finally {

        setLoading(false)
      }
    }

    if (
      searchTerm &&
      searchTerm.trim().length > 0
    ) {

      loadLiveFederation()
    }

  },[
    searchTerm
  ])

  if (loading) {

    return (

      <div
        className="
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-10
          text-center
          text-white
        "
      >

        Loading Live Procurement Federation...

      </div>
    )
  }

  if (
    suppliers.length === 0
  ) {

    return (

      <div
        className="
          rounded-3xl
          border
          border-slate-800
          bg-slate-900
          p-10
          text-center
          text-slate-400
        "
      >

        No procurement federation results found.

      </div>
    )
  }

  return (

    <div
      className="
        space-y-8
      "
    >

      {

        suppliers.map(

          supplier => (

            <TacticalCard

              key={
                supplier.supplierName
              }

              glow

              title={
                supplier.supplierName
              }

              subtitle="
                Defender operational procurement federation
              "

            >

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-8
                "
              >

                <div
                  className="
                    flex
                    gap-5
                  "
                >

                  <div
                    className="
                      h-16
                      w-16
                      overflow-hidden
                      rounded-2xl
                      bg-white
                    "
                  >

                    <Image
                      src="/suppliers/repco.png"
                      alt="Repco"
                      width={64}
                      height={64}
                    />

                  </div>

                  <div
                    className="
                      space-y-3
                    "
                  >

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-3
                      "
                    >

                      <div
                        className="
                          rounded-full
                          bg-green-900/40
                          px-4
                          py-2
                          text-sm
                          text-green-400
                        "
                      >

                        {
                          supplier.procurementScore
                        }% Fitment

                      </div>

                    </div>

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-4
                        text-slate-400
                        text-sm
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Truck size={16} />

                        Physical

                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <MapPin size={16} />

                        {
                          supplier.location
                        }

                      </div>

                    </div>

                  </div>

                </div>

                <div
                  className="
                    text-right
                  "
                >

                  <div
                    className="
                      text-5xl
                      font-black
                      text-green-400
                    "
                  >

                    $

                    {
                      supplier.federationPrice
                    }

                  </div>

                  <div
                    className="
                      mt-2
                      text-slate-400
                    "
                  >

                    Federation Price

                  </div>

                </div>

              </div>

              <div
                className="
                  mt-8
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                "
              >

                <table
                  className="
                    w-full
                  "
                >

                  <thead
                    className="
                      bg-slate-950
                    "
                  >

                    <tr
                      className="
                        text-left
                        text-xs
                        uppercase
                        tracking-wider
                        text-slate-500
                      "
                    >

                      <th
                        className="
                          px-6
                          py-4
                        "
                      >
                        Brand
                      </th>

                      <th
                        className="
                          px-6
                          py-4
                        "
                      >
                        Part
                      </th>

                      <th
                        className="
                          px-6
                          py-4
                        "
                      >
                        OEM
                      </th>

                      <th
                        className="
                          px-6
                          py-4
                        "
                      >
                        Procurement
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      supplier.products.map(

                        product => (

                          <tr

                            key={
                              product.sku
                            }

                            className="
                              border-t
                              border-slate-800
                            "
                          >

                            <td
                              className="
                                px-6
                                py-5
                                text-white
                              "
                            >

                              {
                                product.brand
                              }

                            </td>

                            <td
                              className="
                                px-6
                                py-5
                                text-sky-400
                              "
                            >

                              <a
                                href={
                                  product.url
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="
                                  flex
                                  items-center
                                  gap-2
                                "
                              >

                                {
                                  product.sku
                                }

                                <ExternalLink
                                  size={14}
                                />

                              </a>

                            </td>

                            <td
                              className="
                                px-6
                                py-5
                                text-slate-300
                              "
                            >

                              {
                                product.procurementScore
                              }

                            </td>

                            <td
                              className="
                                px-6
                                py-5
                              "
                            >

                              {

                                product.expeditionReady

                                  ? (

                                    <div
                                      className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-emerald-900/40
                                        px-4
                                        py-2
                                        text-sm
                                        text-emerald-400
                                      "
                                    >

                                      <Shield
                                        size={14}
                                      />

                                      Expedition Ready

                                    </div>
                                  )

                                  : (

                                    <div
                                      className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-slate-800
                                        px-4
                                        py-2
                                        text-sm
                                        text-slate-400
                                      "
                                    >

                                      Standard Procurement

                                    </div>
                                  )
                              }

                            </td>

                          </tr>
                        )
                      )
                    }

                  </tbody>

                </table>

              </div>

            </TacticalCard>
          )
        )
      }

    </div>
  )
}