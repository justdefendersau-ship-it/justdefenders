/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\parts-intelligence\TacticalProcurementResults.tsx
 *
 * Timestamp:
 * 17 May 2026 17:25 Sydney
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Shield,
  Truck
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// MOCK PROCUREMENT RESULTS
// ============================================================

const RESULTS = [

  {
    supplier: "LR Direct AU",
    part: "Defender Puma 2.2 Turbo Hose Kit",
    price: "$184",
    stock: "IN STOCK",
    eta: "2 DAYS",
    oem: 96,
    expedition: 94,
    risk: "LOW"
  },

  {
    supplier: "Paddock Spares",
    part: "OEM Turbo Hose Assembly",
    price: "$212",
    stock: "LIMITED",
    eta: "5 DAYS",
    oem: 98,
    expedition: 97,
    risk: "LOW"
  },

  {
    supplier: "Bearmach AU",
    part: "Heavy Duty Silicone Hose Upgrade",
    price: "$168",
    stock: "IN STOCK",
    eta: "3 DAYS",
    oem: 84,
    expedition: 96,
    risk: "MEDIUM"
  },

  {
    supplier: "eBay Marketplace",
    part: "Turbo Intercooler Hose",
    price: "$92",
    stock: "UNKNOWN",
    eta: "UNKNOWN",
    oem: 42,
    expedition: 28,
    risk: "HIGH"
  }
]

// ============================================================
// HELPERS
// ============================================================

function getRiskColor(risk: string){

  switch(risk){

    case "HIGH":
      return tacticalColors.danger

    case "MEDIUM":
      return tacticalColors.warning

    default:
      return tacticalColors.success
  }
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalProcurementResults(){

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
            PROCUREMENT INTELLIGENCE
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
            Multi-source expedition procurement analysis
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
          LIVE PROCUREMENT FEED
        </div>

      </div>

      {/* ==================================================== */}
      {/* RESULTS */}
      {/* ==================================================== */}

      <div className="space-y-4">

        {RESULTS.map((item)=>{

          const riskColor = getRiskColor(
            item.risk
          )

          return (

            <motion.div

              key={item.supplier}

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
                  `0 0 24px ${riskColor}14`
              }}
            >

              {/* ============================================ */}
              {/* TOP */}
              {/* ============================================ */}

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  lg:flex-row
                  lg:items-start
                  lg:justify-between
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
                    {item.supplier}
                  </div>

                  <div
                    className="
                      mt-2
                      text-sm
                    "

                    style={{
                      color:
                        tacticalColors.textSecondary
                    }}
                  >
                    {item.part}
                  </div>

                </div>

                <div
                  className="
                    text-3xl
                    font-bold
                  "

                  style={{
                    color:
                      tacticalColors.success
                  }}
                >
                  {item.price}
                </div>

              </div>

              {/* ============================================ */}
              {/* META */}
              {/* ============================================ */}

              <div
                className="
                  mt-5
                  grid
                  gap-4
                  md:grid-cols-4
                "
              >

                <div
                  className="
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

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Truck
                      size={15}
                      color={tacticalColors.accentBlue}
                    />

                    <span
                      className="
                        text-xs
                        font-semibold
                      "

                      style={{
                        color:
                          tacticalColors.textMuted
                      }}
                    >
                      STOCK
                    </span>

                  </div>

                  <div
                    className="
                      text-sm
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {item.stock}
                  </div>

                </div>

                <div
                  className="
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

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Clock3
                      size={15}
                      color={tacticalColors.warning}
                    />

                    <span
                      className="
                        text-xs
                        font-semibold
                      "

                      style={{
                        color:
                          tacticalColors.textMuted
                      }}
                    >
                      ETA
                    </span>

                  </div>

                  <div
                    className="
                      text-sm
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {item.eta}
                  </div>

                </div>

                <div
                  className="
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

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <CheckCircle2
                      size={15}
                      color={tacticalColors.success}
                    />

                    <span
                      className="
                        text-xs
                        font-semibold
                      "

                      style={{
                        color:
                          tacticalColors.textMuted
                      }}
                    >
                      OEM SCORE
                    </span>

                  </div>

                  <div
                    className="
                      text-sm
                      font-bold
                    "

                    style={{
                      color:
                        tacticalColors.success
                    }}
                  >
                    {item.oem}/100
                  </div>

                </div>

                <div
                  className="
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

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Shield
                      size={15}
                      color={riskColor}
                    />

                    <span
                      className="
                        text-xs
                        font-semibold
                      "

                      style={{
                        color:
                          tacticalColors.textMuted
                      }}
                    >
                      RISK
                    </span>

                  </div>

                  <div
                    className="
                      text-sm
                      font-bold
                    "

                    style={{
                      color:
                        riskColor
                    }}
                  >
                    {item.risk}
                  </div>

                </div>

              </div>

              {/* ============================================ */}
              {/* EXPEDITION SCORE */}
              {/* ============================================ */}

              <div className="mt-5">

                <div
                  className="
                    mb-2
                    flex
                    justify-between
                    text-sm
                  "

                  style={{
                    color:
                      tacticalColors.textPrimary
                  }}
                >

                  <span>
                    Expedition Suitability
                  </span>

                  <span>
                    {item.expedition}/100
                  </span>

                </div>

                <div
                  className="
                    h-3
                    overflow-hidden
                    rounded-full
                  "

                  style={{
                    background:
                      tacticalColors.surface
                  }}
                >

                  <div
                    className="
                      h-full
                      rounded-full
                    "

                    style={{

                      width:
                        `${item.expedition}%`,

                      background:
                        tacticalColors.accentBlue
                    }}
                  />

                </div>

              </div>

              {/* ============================================ */}
              {/* ALERT */}
              {/* ============================================ */}

              {item.risk === "HIGH" && (

                <div
                  className="
                    mt-5
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    p-4
                  "

                  style={{

                    borderColor:
                      tacticalColors.danger,

                    background:
                      `${tacticalColors.danger}12`
                  }}
                >

                  <AlertTriangle
                    size={18}
                    color={tacticalColors.danger}
                  />

                  <div
                    className="
                      text-sm
                      leading-relaxed
                    "

                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    Supplier reliability anomaly detected.
                    Expedition suitability below operational threshold.
                  </div>

                </div>
              )}

            </motion.div>
          )
        })}

      </div>

    </div>
  )
}