/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalSupplierCard.tsx
 *
 * Timestamp:
 * 17 May 2026 07:05 Sydney
 *
 * PURPOSE:
 * Tactical Supplier Intelligence Card
 * ============================================================
 */

"use client"

import {
  ShieldCheck,
  Truck,
  Wrench,
  MapPin,
  Sparkles
} from "lucide-react"

import TacticalCard
from "./TacticalCard"

import TacticalButton
from "./TacticalButton"

import TacticalStatusBadge
from "./TacticalStatusBadge"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TYPES
// ============================================================

interface TacticalSupplierCardProps {

  supplierName: string

  partName: string

  price: string

  availability: string

  eta: string

  location: string

  trusted?: boolean

  verified?: boolean

  riskLevel?:
    | "low"
    | "medium"
    | "high"

  fitmentConfidence?: number

  recommendation?: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalSupplierCard({

  supplierName,

  partName,

  price,

  availability,

  eta,

  location,

  trusted = false,

  verified = false,

  riskLevel = "low",

  fitmentConfidence = 94,

  recommendation

}: TacticalSupplierCardProps) {

  return (

    <TacticalCard

      glow={trusted}

      hover

      bordered
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >

        {/* ============================================= */}
        {/* LEFT */}
        {/* ============================================= */}

        <div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            <div
              className="
                text-xl
                font-bold
                tracking-tight
              "
              style={{
                color:
                  tacticalColors.textPrimary
              }}
            >
              {supplierName}
            </div>

            {trusted && (

              <TacticalStatusBadge

                label="
                Trusted
                "

                status="healthy"

                pulse
              />
            )}

            {verified && (

              <TacticalStatusBadge

                label="
                Verified
                "

                status="info"
              />
            )}

          </div>

          <div
            className="
              mt-3
              text-sm
            "
            style={{
              color:
                tacticalColors.textSecondary
            }}
          >
            {partName}
          </div>
        </div>

        {/* ============================================= */}
        {/* PRICE */}
        {/* ============================================= */}

        <div
          className="
            rounded-2xl
            border
            px-5
            py-4
            text-right
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
              text-xs
              uppercase
              tracking-[0.14em]
            "
            style={{
              color:
                tacticalColors.textMuted
            }}
          >
            Best Price
          </div>

          <div
            className="
              mt-2
              text-3xl
              font-bold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {price}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* METRICS */}
      {/* ================================================= */}

      <div
        className="
          mt-7
          grid
          grid-cols-1
          gap-4
          md:grid-cols-3
        "
      >

        {/* Availability */}

        <div
          className="
            rounded-2xl
            border
            p-4
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
              flex
              items-center
              gap-2
            "
          >

            <Truck
              size={16}
              color={tacticalColors.accentBlue}
            />

            <div
              className="
                text-xs
                uppercase
                tracking-[0.14em]
              "
              style={{
                color:
                  tacticalColors.textMuted
              }}
            >
              Availability
            </div>
          </div>

          <div
            className="
              mt-3
              text-lg
              font-semibold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {availability}
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
            ETA: {eta}
          </div>
        </div>

        {/* Fitment */}

        <div
          className="
            rounded-2xl
            border
            p-4
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
              flex
              items-center
              gap-2
            "
          >

            <ShieldCheck
              size={16}
              color={tacticalColors.success}
            />

            <div
              className="
                text-xs
                uppercase
                tracking-[0.14em]
              "
              style={{
                color:
                  tacticalColors.textMuted
              }}
            >
              Fitment Confidence
            </div>
          </div>

          <div
            className="
              mt-3
              text-lg
              font-semibold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {fitmentConfidence}%
          </div>

          <div
            className="
              mt-3
              h-2
              overflow-hidden
              rounded-full
            "
            style={{
              background:
                "rgba(255,255,255,0.06)"
            }}
          >

            <div
              className="
                h-full
                rounded-full
              "
              style={{

                width:
                  `${fitmentConfidence}%`,

                background:
                  tacticalColors.success
              }}
            />

          </div>
        </div>

        {/* Logistics */}

        <div
          className="
            rounded-2xl
            border
            p-4
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
              flex
              items-center
              gap-2
            "
          >

            <MapPin
              size={16}
              color={tacticalColors.accentAmber}
            />

            <div
              className="
                text-xs
                uppercase
                tracking-[0.14em]
              "
              style={{
                color:
                  tacticalColors.textMuted
              }}
            >
              Logistics
            </div>
          </div>

          <div
            className="
              mt-3
              text-lg
              font-semibold
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {location}
          </div>

          <div className="mt-2">

            <TacticalStatusBadge

              label={
                riskLevel === "low"
                  ? "Low Risk"
                  : riskLevel === "medium"
                  ? "Moderate Risk"
                  : "High Risk"
              }

              status={
                riskLevel === "low"
                  ? "healthy"
                  : riskLevel === "medium"
                  ? "warning"
                  : "critical"
              }
            />

          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* RECOMMENDATION */}
      {/* ================================================= */}

      {recommendation && (

        <div
          className="
            mt-7
            rounded-2xl
            border
            p-5
          "
          style={{

            background:
              "rgba(79,124,255,0.08)",

            borderColor:
              "rgba(79,124,255,0.14)"
          }}
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <Sparkles
              size={18}
              color={tacticalColors.accentBlue}
            />

            <div>

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
                AI Procurement Recommendation
              </div>

              <div
                className="
                  mt-2
                  text-sm
                  leading-relaxed
                "
                style={{
                  color:
                    tacticalColors.textSecondary
                }}
              >
                {recommendation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}

      <div
        className="
          mt-7
          flex
          flex-wrap
          gap-3
        "
      >

        <TacticalButton>

          View Supplier

        </TacticalButton>

        <TacticalButton
          variant="secondary"
        >

          Compare Logistics

        </TacticalButton>

        <TacticalButton
          variant="ghost"
        >

          Save Intelligence

        </TacticalButton>

      </div>

    </TacticalCard>
  )
}