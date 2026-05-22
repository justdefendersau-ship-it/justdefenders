/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\SupplierResultsTable.tsx
 *
 * Timestamp:
 * 22 May 2026 08:48 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Results Table
 *
 * STRATEGY:
 * PASS 30A — Tactical Compression Stabilization
 *
 * OBJECTIVES:
 * - improve procurement scan cadence
 * - improve tactical density
 * - reduce supplier card bloat
 * - normalize federation rhythm
 * - stabilize Alpha operational layout
 *
 * ============================================================
 */

"use client"

import {
  ChevronRight,
  FileText,
  Plus,
  Shield,
  Activity,
  PackageCheck
} from "lucide-react"

import {
  useState
} from "react"

// ============================================================
// TYPES
// ============================================================

interface Product {

  brand: string

  sku: string

  title: string

  price: number

  procurementScore: number

  deliveryEstimate: string
}

interface Props {

  products: Product[]
}

// ============================================================
// COMPONENT
// ============================================================

export default function SupplierResultsTable({

  products

}: Props){

  const [

    expandedRow,

    setExpandedRow

  ] = useState<number | null>(
    null
  )

  return (

    <div
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
          flex
          items-center
          justify-between
          border-b
          border-slate-900
          px-6
          py-4
        "
      >

        <div>

          <div
            className="
              text-[12px]
              font-black
              uppercase
              tracking-[0.22em]
              text-[#38BDF8]
            "
          >
            Procurement Federation
          </div>

          <div
            className="
              mt-1
              text-[22px]
              font-black
              text-white
            "
          >
            Tactical Procurement Results
          </div>

        </div>

        {/* ================================================== */}
        {/* ACTIONS */}
        {/* ================================================== */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <HeaderAction
            icon={<PackageCheck className="h-4 w-4" />}
            label="Procurement List"
          />

          <HeaderAction
            icon={<FileText className="h-4 w-4" />}
            label="Export Pack"
          />

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
            w-full
          "
        >

          {/* ================================================= */}
          {/* HEAD */}
          {/* ================================================= */}

          <thead
            className="
              border-b
              border-slate-900
              bg-[#050C18]
            "
          >

            <tr>

              <TableHead>
                Brand
              </TableHead>

              <TableHead>
                Part Intelligence
              </TableHead>

              <TableHead>
                OEM
              </TableHead>

              <TableHead>
                Price
              </TableHead>

              <TableHead>
                Delivery
              </TableHead>

              <TableHead>
                Federation
              </TableHead>

              <TableHead>
              </TableHead>

            </tr>

          </thead>

          {/* ================================================= */}
          {/* BODY */}
          {/* ================================================= */}

          <tbody>

            {

              products.map((product, index) => {

                const expanded =
                  expandedRow === index

                return (

                  <>
                    {/* ========================================= */}
                    {/* PROCUREMENT ROW */}
                    {/* ========================================= */}

                    <tr
                      key={index}
                      className="
                        group
                        border-b
                        border-slate-900/70
                        transition-all
                        duration-150
                        hover:bg-[#081426]
                      "
                    >

                      {/* BRAND */}

                      <td
                        className="
                          px-6
                          py-3
                        "
                      >

                        <div
                          className="
                            text-[17px]
                            font-black
                            text-white
                          "
                        >
                          {product.brand}
                        </div>

                      </td>

                      {/* PART */}

                      <td
                        className="
                          px-6
                          py-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <button

                            onClick={() =>

                              setExpandedRow(

                                expanded
                                ?
                                null
                                :
                                index
                              )

                            }

                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-slate-800
                              bg-[#050C18]
                              transition-all
                              hover:border-slate-700
                            "
                          >

                            <ChevronRight
                              className={`
                                h-4
                                w-4
                                text-slate-400
                                transition-all

                                ${
                                  expanded

                                  ?

                                  "rotate-90"

                                  :

                                  ""
                                }
                              `}
                            />

                          </button>

                          <div>

                            <div
                              className="
                                text-[17px]
                                font-black
                                tracking-[-0.02em]
                                text-[#38BDF8]
                              "
                            >
                              {product.sku}
                            </div>

                            <div
                              className="
                                mt-1
                                text-[13px]
                                text-slate-400
                              "
                            >
                              {product.title}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* SCORE */}

                      <td
                        className="
                          px-6
                          py-3
                        "
                      >

                        <div
                          className="
                            text-[24px]
                            font-black
                            tracking-[-0.03em]
                            text-[#60A5FA]
                          "
                        >
                          {product.procurementScore}
                        </div>

                      </td>

                      {/* PRICE */}

                      <td
                        className="
                          px-6
                          py-3
                        "
                      >

                        <div
                          className="
                            text-[24px]
                            font-black
                            tracking-[-0.03em]
                            text-[#4ADE80]
                          "
                        >
                          ${product.price}
                        </div>

                      </td>

                      {/* DELIVERY */}

                      <td
                        className="
                          px-6
                          py-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <div
                            className="
                              h-2
                              w-2
                              rounded-full
                              bg-[#4ADE80]
                            "
                          />

                          <div
                            className="
                              text-[14px]
                              font-semibold
                              text-white
                            "
                          >
                            {product.deliveryEstimate}
                          </div>

                        </div>

                      </td>

                      {/* FEDERATION */}

                      <td
                        className="
                          px-6
                          py-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#166534]
                            bg-[#052E1B]
                            px-3
                            py-1.5
                            text-[11px]
                            font-black
                            text-[#4ADE80]
                          "
                        >

                          <Activity
                            className="
                              h-3
                              w-3
                            "
                          />

                          LIVE

                        </div>

                      </td>

                      {/* ACTIONS */}

                      <td
                        className="
                          px-6
                          py-3
                        "
                      >

                        <div
                          className="
                            flex
                            justify-end
                            gap-2
                          "
                        >

                          <ActionButton
                            icon={<Plus className="h-4 w-4" />}
                            label="Add"
                            secondary
                          />

                          <ActionButton
                            icon={<Shield className="h-4 w-4" />}
                            label="Intel"
                          />

                        </div>

                      </td>

                    </tr>

                    {/* ========================================= */}
                    {/* EXPANDED ROW */}
                    {/* ========================================= */}

                    {

                      expanded

                      &&

                      <tr>

                        <td
                          colSpan={7}
                          className="
                            border-b
                            border-slate-900
                            bg-[#050C18]
                            px-6
                            py-4
                          "
                        >

                          <div
                            className="
                              grid
                              gap-4
                              lg:grid-cols-3
                            "
                          >

                            <ExpandedCard
                              title="Vehicle Fitment"
                              value="97%"
                              subtitle="High operational confidence"
                              color="green"
                            />

                            <ExpandedCard
                              title="Federation Status"
                              value="LIVE"
                              subtitle="Supplier federation operational"
                              color="blue"
                            />

                            <ExpandedCard
                              title="Procurement Risk"
                              value="LOW"
                              subtitle="Stable operational supply"
                              color="amber"
                            />

                          </div>

                        </td>

                      </tr>
                    }

                  </>
                )
              })
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}

// ============================================================
// TABLE HEAD
// ============================================================

function TableHead({

  children

}: {

  children: React.ReactNode

}){

  return (

    <th
      className="
        px-6
        py-3
        text-left
        text-[12px]
        font-black
        uppercase
        tracking-[0.22em]
        text-slate-500
      "
    >
      {children}
    </th>
  )
}

// ============================================================
// ACTION BUTTON
// ============================================================

function ActionButton({

  icon,

  label,

  secondary

}: {

  icon: React.ReactNode

  label: string

  secondary?: boolean

}){

  return (

    <button
      className={`
        flex
        h-[38px]
        items-center
        gap-2
        rounded-2xl
        px-4
        text-[12px]
        font-black
        transition-all
        duration-150

        ${
          secondary

          ?

          "border border-slate-800 bg-[#050C18] text-slate-300 hover:border-slate-700"

          :

          "bg-[#2563EB] text-white hover:bg-[#3B82F6]"
        }
      `}
    >

      {icon}

      <span>
        {label}
      </span>

    </button>
  )
}

// ============================================================
// HEADER ACTION
// ============================================================

function HeaderAction({

  icon,

  label

}: {

  icon: React.ReactNode

  label: string

}){

  return (

    <button
      className="
        flex
        h-[40px]
        items-center
        gap-2
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        px-4
        text-[12px]
        font-black
        text-slate-300
        transition-all
        hover:border-slate-700
      "
    >

      {icon}

      <span>
        {label}
      </span>

    </button>
  )
}

// ============================================================
// EXPANDED CARD
// ============================================================

function ExpandedCard({

  title,

  value,

  subtitle,

  color

}: {

  title: string

  value: string

  subtitle: string

  color:
    "green"
    |
    "blue"
    |
    "amber"
}){

  const colors = {

    green:
      "text-[#4ADE80]",

    blue:
      "text-[#60A5FA]",

    amber:
      "text-[#FBBF24]"
  }

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-[#07101F]
        p-4
      "
    >

      <div
        className="
          text-[11px]
          font-black
          uppercase
          tracking-[0.18em]
          text-slate-500
        "
      >
        {title}
      </div>

      <div
        className={`
          mt-2
          text-[28px]
          font-black
          tracking-[-0.04em]
          ${colors[color]}
        `}
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-[13px]
          text-slate-400
        "
      >
        {subtitle}
      </div>

    </div>
  )
}