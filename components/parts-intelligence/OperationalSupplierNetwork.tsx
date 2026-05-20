/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\parts-intelligence\OperationalSupplierNetwork.tsx
 *
 * Timestamp:
 * 17 May 2026 19:35 Sydney
 *
 * PURPOSE:
 * Operational Supplier Intelligence Network
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  Globe2,
  MapPinned,
  ShieldCheck,
  Truck
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

import {
  REGIONAL_OPERATIONAL_SUPPLIERS
} from "@/lib/procurement/regionalOperationalSuppliers"

// ============================================================
// COMPONENT
// ============================================================

export default function OperationalSupplierNetwork(){

  return (

    <div className="mt-6">

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              text-xs
              font-semibold
              tracking-[0.18em]
            "

            style={{
              color:
                tacticalColors.accentBlue
            }}
          >
            OPERATIONAL SUPPLIER NETWORK
          </div>

          <div
            className="
              mt-2
              text-sm
            "

            style={{
              color:
                tacticalColors.textMuted
            }}
          >
            Regional expedition procurement intelligence graph
          </div>

        </div>

        <div
          className="
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
          "

          style={{

            borderColor:
              tacticalColors.border,

            color:
              tacticalColors.textSecondary
          }}
        >
          {REGIONAL_OPERATIONAL_SUPPLIERS.length}
          {" "}
          ACTIVE SUPPLIERS
        </div>

      </div>

      {/* ==================================================== */}
      {/* GRID */}
      {/* ==================================================== */}

      <div
        className="
          grid
          gap-4
          lg:grid-cols-2
          xl:grid-cols-3
        "
      >

        {REGIONAL_OPERATIONAL_SUPPLIERS.map((supplier)=>{

          return (

            <motion.div

              key={supplier.id}

              whileHover={{
                y: -2
              }}

              className="
                rounded-2xl
                border
                p-5
              "

              style={{

                background:
                  tacticalColors.surfaceElevated,

                borderColor:
                  tacticalColors.border,

                boxShadow:
                  `0 0 22px ${tacticalColors.accentBlue}10`
              }}
            >

              {/* ============================================ */}
              {/* TOP */}
              {/* ============================================ */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >

                <div>

                  <div
                    className="
                      text-lg
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {supplier.name}
                  </div>

                  <div
                    className="
                      mt-1
                      text-sm
                    "

                    style={{
                      color:
                        tacticalColors.textMuted
                    }}
                  >
                    {supplier.region}
                    {" • "}
                    {supplier.country}
                  </div>

                </div>

                <div
                  className="
                    rounded-full
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    tracking-[0.16em]
                  "

                  style={{

                    background:
                      `${tacticalColors.success}18`,

                    color:
                      tacticalColors.success
                  }}
                >
                  ACTIVE
                </div>

              </div>

              {/* ============================================ */}
              {/* SCORES */}
              {/* ============================================ */}

              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                <div
                  className="
                    rounded-xl
                    border
                    p-3
                  "

                  style={{

                    borderColor:
                      tacticalColors.border,

                    background:
                      tacticalColors.surface
                  }}
                >

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <ShieldCheck
                      size={14}
                      color={tacticalColors.success}
                    />

                    <span
                      className="
                        text-[10px]
                        font-semibold
                        tracking-[0.12em]
                      "

                      style={{
                        color:
                          tacticalColors.textMuted
                      }}
                    >
                      OEM
                    </span>

                  </div>

                  <div
                    className="
                      text-lg
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.success
                    }}
                  >
                    {supplier.oemPriority}
                  </div>

                </div>

                <div
                  className="
                    rounded-xl
                    border
                    p-3
                  "

                  style={{

                    borderColor:
                      tacticalColors.border,

                    background:
                      tacticalColors.surface
                  }}
                >

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Truck
                      size={14}
                      color={tacticalColors.warning}
                    />

                    <span
                      className="
                        text-[10px]
                        font-semibold
                        tracking-[0.12em]
                      "

                      style={{
                        color:
                          tacticalColors.textMuted
                      }}
                    >
                      OPS
                    </span>

                  </div>

                  <div
                    className="
                      text-lg
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.warning
                    }}
                  >
                    {supplier.operationalPriority}
                  </div>

                </div>

              </div>

              {/* ============================================ */}
              {/* REGION */}
              {/* ============================================ */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  p-4
                "

                style={{

                  borderColor:
                    tacticalColors.border,

                  background:
                    tacticalColors.surface
                }}
              >

                <MapPinned
                  size={18}
                  color={tacticalColors.accentBlue}
                />

                <div>

                  <div
                    className="
                      text-xs
                      font-semibold
                      tracking-[0.12em]
                    "

                    style={{
                      color:
                        tacticalColors.textMuted
                    }}
                  >
                    REGIONAL FULFILMENT
                  </div>

                  <div
                    className="
                      mt-1
                      text-sm
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {supplier.regionalFulfilmentScore}
                    {" "}
                    / 100
                  </div>

                </div>

              </div>

              {/* ============================================ */}
              {/* TAGS */}
              {/* ============================================ */}

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {supplier.tags.map((tag)=>{

                  return (

                    <div

                      key={tag}

                      className="
                        rounded-full
                        border
                        px-2
                        py-1
                        text-[10px]
                        font-semibold
                        tracking-[0.12em]
                      "

                      style={{

                        borderColor:
                          tacticalColors.border,

                        color:
                          tacticalColors.textSecondary
                      }}
                    >
                      {tag}
                    </div>
                  )
                })}

              </div>

              {/* ============================================ */}
              {/* WEBSITE */}
              {/* ============================================ */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-sm
                "

                style={{
                  color:
                    tacticalColors.accentBlue
                }}
              >

                <Globe2 size={15} />

                <span>
                  {supplier.website}
                </span>

              </div>

            </motion.div>
          )
        })}

      </div>

    </div>
  )
}