/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\SupplierCard.tsx
 *
 * Timestamp:
 * 19 May 2026 22:30 Sydney
 *
 * PURPOSE:
 * Production Procurement Supplier Card
 * ============================================================
 */

"use client"

import React from "react"

import {
  ProcurementProduct
} from "@/types/procurement"

// ============================================================
// PROPS
// ============================================================

interface SupplierCardProps {

  item: ProcurementProduct

  isBest: boolean
}

// ============================================================
// COMPONENT
// ============================================================

export default function SupplierCard({

  item,
  isBest

}: SupplierCardProps) {

  // ==========================================================
  // PRICE
  // ==========================================================

  const displayPrice =

    item.clubPrice
    ??
    item.tradePrice
    ??
    item.standardPrice

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className={`
        rounded-2xl
        p-5
        border
        transition-all
        shadow-lg

        ${
          isBest
            ? "border-green-500 bg-green-950/20"
            : "border-slate-700 bg-slate-900"
        }
      `}
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          mb-4
        "
      >

        <div>

          <h2
            className="
              text-white
              text-xl
              font-bold
            "
          >
            {item.supplier}
          </h2>

          <div
            className="
              text-slate-400
              text-sm
              mt-1
            "
          >
            {item.brand}
          </div>

        </div>

        {isBest && (

          <span
            className="
              text-xs
              font-bold
              px-3
              py-1
              rounded-full
              bg-green-600
              text-white
              whitespace-nowrap
            "
          >
            BEST MATCH
          </span>

        )}

      </div>

      {/* ==================================================== */}
      {/* PRODUCT */}
      {/* ==================================================== */}

      <div
        className="
          text-slate-300
          space-y-3
        "
      >

        <div>

          <div
            className="
              text-sm
              text-slate-500
              mb-1
            "
          >
            Product
          </div>

          <div
            className="
              text-white
              font-medium
              leading-relaxed
            "
          >
            {item.title}
          </div>

        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            text-sm
          "
        >

          <div>

            <div
              className="
                text-slate-500
              "
            >
              SKU
            </div>

            <div
              className="
                text-white
              "
            >
              {item.sku || "-"}
            </div>

          </div>

          <div>

            <div
              className="
                text-slate-500
              "
            >
              Category
            </div>

            <div
              className="
                text-white
              "
            >
              {item.category || "-"}
            </div>

          </div>

        </div>

        {/* ================================================== */}
        {/* PRICE */}
        {/* ================================================== */}

        <div
          className="
            flex
            items-end
            justify-between
            pt-2
          "
        >

          <div>

            <div
              className="
                text-slate-500
                text-sm
              "
            >
              Procurement Price
            </div>

            <div
              className="
                text-3xl
                font-bold
                text-green-400
              "
            >
              {

                displayPrice !== undefined

                  ? `$${displayPrice.toFixed(2)}`

                  : "-"
              }
            </div>

          </div>

          {/* ================================================ */}
          {/* SCORE */}
          {/* ================================================ */}

          <div
            className="
              text-right
            "
          >

            <div
              className="
                text-slate-500
                text-sm
              "
            >
              Procurement Score
            </div>

            <div
              className="
                text-sky-400
                font-bold
                text-xl
              "
            >
              {item.procurementScore || 0}
            </div>

          </div>

        </div>

        {/* ================================================== */}
        {/* TAGS */}
        {/* ================================================== */}

        <div
          className="
            flex
            flex-wrap
            gap-2
            pt-3
          "
        >

          {item.expeditionReady && (

            <span
              className="
                text-xs
                font-semibold
                px-3
                py-1
                rounded-full
                bg-amber-500/20
                border
                border-amber-500/40
                text-amber-300
              "
            >
              Expedition Ready
            </span>

          )}

          {item.inStock && (

            <span
              className="
                text-xs
                font-semibold
                px-3
                py-1
                rounded-full
                bg-green-500/20
                border
                border-green-500/40
                text-green-300
              "
            >
              In Stock
            </span>

          )}

          {item.clubPrice && (

            <span
              className="
                text-xs
                font-semibold
                px-3
                py-1
                rounded-full
                bg-blue-500/20
                border
                border-blue-500/40
                text-blue-300
              "
            >
              Club Pricing
            </span>

          )}

        </div>

        {/* ================================================== */}
        {/* LINK */}
        {/* ================================================== */}

        {

          item.url && (

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-5
                inline-flex
                items-center
                justify-center
                w-full
                rounded-xl
                bg-sky-600
                hover:bg-sky-500
                transition-colors
                px-4
                py-3
                text-white
                font-semibold
              "
            >
              View Supplier
            </a>

          )
        }

      </div>

    </div>
  )
}