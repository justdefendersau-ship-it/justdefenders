/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\SupplierResultsCard.tsx
 *
 * Timestamp:
 * 21 May 2026 18:36 Sydney
 *
 * PURPOSE:
 * Federation Procurement Row
 *
 * STRATEGY:
 * PASS 26C — Federation Procurement Row Compression
 *
 * OBJECTIVES:
 * - compress supplier hierarchy
 * - improve procurement density
 * - improve scan ergonomics
 * - create federation-row behaviour
 * - improve operational cohesion
 *
 * ============================================================
 */

"use client"

import {
  ChevronDown,
  Shield,
  Truck,
  Clock3,
  Globe,
  BadgeCheck,
  Activity
} from "lucide-react"

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

  supplier: string

  supplierLogo?: string

  fitment: number

  procurementScore: number

  price: number

  products: Product[]

  verified?: boolean

  expeditionReady?: boolean

  latency?: number
}

// ============================================================
// COMPONENT
// ============================================================

export default function SupplierResultsCard({

  supplier,

  supplierLogo,

  fitment,

  procurementScore,

  price,

  products,

  verified = true,

  expeditionReady = true,

  latency = 420

}: Props){

  return (

    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-slate-800
        bg-[#07101F]
        shadow-[0_0_30px_rgba(0,0,0,0.35)]
      "
    >

      {/* ==================================================== */}
      {/* SUPPLIER HEADER */}
      {/* ==================================================== */}

      <div
        className="
          border-b
          border-slate-900
          px-6
          py-5
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-5
          "
        >

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-1
              gap-5
            "
          >

            {/* LOGO */}

            <div
              className="
                flex
                h-[74px]
                w-[74px]
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-white
              "
            >

              {

                supplierLogo

                ?

                <img
                  src={supplierLogo}
                  alt={supplier}
                  className="
                    h-full
                    w-full
                    object-contain
                  "
                />

                :

                <div
                  className="
                    text-xs
                    font-black
                    text-slate-500
                  "
                >
                  LOGO
                </div>
              }

            </div>

            {/* CONTENT */}

            <div
              className="
                flex-1
              "
            >

              {/* SUPPLIER */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >

                <div>

                  <div
                    className="
                      text-[13px]
                      font-black
                      uppercase
                      tracking-[0.28em]
                      text-[#38BDF8]
                    "
                  >
                    {supplier}
                  </div>

                  <div
                    className="
                      mt-1
                      text-[17px]
                      font-semibold
                      text-slate-400
                    "
                  >
                    Defender 110 300Tdi
                    ·
                    1994-1998
                  </div>

                </div>

                <FederationChip
                  label={`${fitment}% Fitment`}
                  color="green"
                />

                <FederationChip
                  label="OEM Compatible"
                  color="blue"
                />

                <FederationChip
                  label="Operational Stock"
                  color="green"
                />

                <FederationChip
                  label={`Procurement ${procurementScore}`}
                  color="blue"
                />

                {

                  expeditionReady

                  &&

                  <FederationChip
                    label="Expedition Ready"
                    color="amber"
                  />
                }

                {

                  verified

                  &&

                  <FederationChip
                    label="Verified Supplier"
                    color="red"
                  />
                }

              </div>

              {/* META */}

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-5
                  text-[14px]
                  text-slate-400
                "
              >

                <MetaItem
                  icon={<Truck className="h-4 w-4" />}
                  label="Physical"
                />

                <MetaItem
                  icon={<Clock3 className="h-4 w-4" />}
                  label="2d Dispatch"
                />

                <MetaItem
                  icon={<Shield className="h-4 w-4" />}
                  label="High Confidence"
                />

                <MetaItem
                  icon={<Globe className="h-4 w-4" />}
                  label="AU Federation"
                />

                <MetaItem
                  icon={<Activity className="h-4 w-4" />}
                  label={`${latency}ms`}
                />

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div
            className="
              flex
              items-start
              gap-5
            "
          >

            {/* PRICE */}

            <div
              className="
                text-right
              "
            >

              <div
                className="
                  text-[68px]
                  font-black
                  leading-none
                  tracking-[-0.05em]
                  text-[#4ADE80]
                "
              >
                ${price}
              </div>

              <div
                className="
                  mt-1
                  text-[15px]
                  font-semibold
                  text-slate-400
                "
              >
                Club Price
              </div>

            </div>

            {/* ACTION */}

            <div
              className="
                flex
                flex-col
                gap-3
              "
            >

              <button
                className="
                  h-[46px]
                  rounded-2xl
                  bg-[#2563EB]
                  px-5
                  text-[14px]
                  font-black
                  text-white
                  transition-all
                  hover:bg-[#3B82F6]
                "
              >
                View Supplier
              </button>

              <button
                className="
                  flex
                  h-[42px]
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-800
                  bg-[#050C18]
                  px-4
                  text-[13px]
                  font-black
                  text-slate-300
                "
              >

                <ChevronDown
                  className="
                    h-4
                    w-4
                  "
                />

                Intelligence

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* PROCUREMENT TABLE */}
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
                Part
              </TableHead>

              <TableHead>
                OEM Score
              </TableHead>

              <TableHead>
                Club
              </TableHead>

              <TableHead>
                Delivery
              </TableHead>

              <TableHead>
              </TableHead>

            </tr>

          </thead>

          <tbody>

            {

              products.map((product, index) => (

                <tr
                  key={index}
                  className="
                    border-b
                    border-slate-900/60
                    transition-all
                    hover:bg-[#081426]
                  "
                >

                  {/* BRAND */}

                  <td
                    className="
                      px-6
                      py-5
                    "
                  >

                    <div
                      className="
                        text-[18px]
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
                      py-5
                    "
                  >

                    <div
                      className="
                        text-[18px]
                        font-black
                        text-[#38BDF8]
                      "
                    >
                      {product.sku}
                    </div>

                    <div
                      className="
                        mt-1
                        text-[14px]
                        text-slate-400
                      "
                    >
                      {product.title}
                    </div>

                  </td>

                  {/* SCORE */}

                  <td
                    className="
                      px-6
                      py-5
                    "
                  >

                    <div
                      className="
                        text-[26px]
                        font-black
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

                  {/* DELIVERY */}

                  <td
                    className="
                      px-6
                      py-5
                    "
                  >

                    <div
                      className="
                        text-[16px]
                        font-semibold
                        text-white
                      "
                    >
                      {product.deliveryEstimate}
                    </div>

                  </td>

                  {/* ACTIONS */}

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                    "
                  >

                    <div
                      className="
                        flex
                        justify-end
                        gap-3
                      "
                    >

                      <button
                        className="
                          h-[42px]
                          rounded-2xl
                          border
                          border-slate-800
                          bg-[#050C18]
                          px-4
                          text-[13px]
                          font-black
                          text-slate-300
                        "
                      >
                        Intelligence
                      </button>

                      <button
                        className="
                          h-[42px]
                          rounded-2xl
                          bg-[#2563EB]
                          px-5
                          text-[13px]
                          font-black
                          text-white
                        "
                      >
                        View Supplier
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </section>
  )
}

// ============================================================
// FEDERATION CHIP
// ============================================================

function FederationChip({

  label,

  color

}: {

  label: string

  color:
    "green"
    |
    "blue"
    |
    "amber"
    |
    "red"
}){

  const colors = {

    green:
      "border-[#166534] bg-[#052E1B] text-[#4ADE80]",

    blue:
      "border-[#1D4ED8] bg-[#071B46] text-[#60A5FA]",

    amber:
      "border-[#92400E] bg-[#3B2407] text-[#FBBF24]",

    red:
      "border-[#7F1D1D] bg-[#2A1212] text-[#F87171]"
  }

  return (

    <div
      className={`
        rounded-full
        border
        px-4
        py-2
        text-[12px]
        font-black
        ${colors[color]}
      `}
    >
      {label}
    </div>
  )
}

// ============================================================
// META ITEM
// ============================================================

function MetaItem({

  icon,

  label

}: {

  icon: React.ReactNode

  label: string

}){

  return (

    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <div
        className="
          text-slate-500
        "
      >
        {icon}
      </div>

      <span>
        {label}
      </span>

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
        py-4
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