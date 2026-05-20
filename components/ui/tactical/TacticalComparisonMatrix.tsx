/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalComparisonMatrix.tsx
 *
 * Timestamp:
 * 17 May 2026 12:35 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Comparison Matrix
 * ============================================================
 */

"use client"

import TacticalCard
from "./TacticalCard"

import TacticalStatusBadge
from "./TacticalStatusBadge"

import TacticalButton
from "./TacticalButton"

import useViewport
from "@/hooks/useViewport"

import {
  supplierMatrix
} from "@/data/mockOperationalData"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalComparisonMatrix() {

  const {
    isMobile
  } = useViewport()

  // ==========================================================
  // MOBILE CARD VIEW
  // ==========================================================

  if(isMobile){

    return (

      <div
        className="
          grid
          gap-4
        "
      >

        {supplierMatrix.map((item, idx)=>(

          <TacticalCard
            key={idx}
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
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
                  {item.logistics}
                </div>

              </div>

              <div
                className="
                  text-right
                "
              >

                <div
                  className="
                    text-2xl
                    font-bold
                  "
                  style={{
                    color:
                      tacticalColors.textPrimary
                  }}
                >
                  {item.price}
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
                  ETA {item.eta}
                </div>

              </div>

            </div>

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-3
              "
            >

              <TacticalStatusBadge

                label={item.fitment}

                status="healthy"
              />

              <TacticalStatusBadge

                label={item.readiness}

                status={
                  item.readiness === "High"
                    ? "healthy"
                    : "warning"
                }
              />

              <TacticalStatusBadge

                label={item.ai}

                status="info"
              />

            </div>

            <div className="mt-6">

              <TacticalButton
                variant="secondary"
              >

                Compare Supplier

              </TacticalButton>

            </div>

          </TacticalCard>
        ))}

      </div>
    )
  }

  // ==========================================================
  // DESKTOP TABLE
  // ==========================================================

  return (

    <TacticalCard

      title="
      Tactical Procurement Matrix
      "

      subtitle="
      AI-assisted supplier comparison + operational logistics analysis
      "

      glow
    >

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
            border-separate
            border-spacing-y-3
          "
        >

          <thead>

            <tr>

              {[
                "Supplier",
                "Logistics",
                "Price",
                "ETA",
                "Fitment",
                "Readiness",
                "AI",
                "Actions"
              ].map((header, idx)=>(

                <th

                  key={idx}

                  className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                  "

                  style={{
                    color:
                      tacticalColors.textMuted
                  }}
                >
                  {header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {supplierMatrix.map((item, idx)=>(

              <tr
                key={idx}
                className="
                  backdrop-blur-xl
                "
              >

                {/* SUPPLIER */}

                <td
                  className="
                    rounded-l-2xl
                    border-y
                    border-l
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  <div
                    className="
                      text-sm
                      font-semibold
                    "
                    style={{
                      color:
                        tacticalColors.textPrimary
                    }}
                  >
                    {item.supplier}
                  </div>

                </td>

                {/* LOGISTICS */}

                <td
                  className="
                    border-y
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  <div
                    className="
                      text-sm
                    "
                    style={{
                      color:
                        tacticalColors.textSecondary
                    }}
                  >
                    {item.logistics}
                  </div>

                </td>

                {/* PRICE */}

                <td
                  className="
                    border-y
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

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
                    {item.price}
                  </div>

                </td>

                {/* ETA */}

                <td
                  className="
                    border-y
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  <div
                    className="
                      text-sm
                    "
                    style={{
                      color:
                        tacticalColors.textSecondary
                    }}
                  >
                    {item.eta}
                  </div>

                </td>

                {/* FITMENT */}

                <td
                  className="
                    border-y
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  <TacticalStatusBadge

                    label={item.fitment}

                    status="healthy"
                  />

                </td>

                {/* READINESS */}

                <td
                  className="
                    border-y
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  <TacticalStatusBadge

                    label={item.readiness}

                    status={
                      item.readiness === "High"
                        ? "healthy"
                        : "warning"
                    }
                  />

                </td>

                {/* AI */}

                <td
                  className="
                    border-y
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  <TacticalStatusBadge

                    label={item.ai}

                    status="info"

                    pulse={
                      item.ai === "Recommended"
                    }
                  />

                </td>

                {/* ACTIONS */}

                <td
                  className="
                    rounded-r-2xl
                    border-y
                    border-r
                    px-4
                    py-5
                  "
                  style={{

                    background:
                      "rgba(255,255,255,0.03)",

                    borderColor:
                      "rgba(255,255,255,0.05)"
                  }}
                >

                  <TacticalButton
                    variant="secondary"
                  >

                    Compare

                  </TacticalButton>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </TacticalCard>
  )
}