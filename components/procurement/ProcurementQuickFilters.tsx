/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\ProcurementQuickFilters.tsx
 *
 * Timestamp:
 * 18 May 2026 18:00 Sydney
 *
 * PURPOSE:
 * Procurement Optimisation Controls
 *
 * STRATEGY:
 * Operational filtering +
 * procurement orchestration +
 * expedition prioritisation.
 * ============================================================
 */

"use client"

import { useState } from "react"

import {
  BadgeCheck,
  PackageCheck,
  ShieldCheck,
  Truck,
  Tags,
  Printer,
  Mail,
  ChevronDown,
  TimerReset,
  ShieldAlert,
  MapPin,
  Wrench,
  Globe2
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TRUST CHIPS
// ============================================================

const TRUST_CHIPS = [

  {
    label:
      "Best Price",

    icon:
      Tags,

    color:
      "#F59E0B"
  },

  {
    label:
      "Verified",

    icon:
      BadgeCheck,

    color:
      "#2563EB"
  },

  {
    label:
      "In Stock",

    icon:
      PackageCheck,

    color:
      "#22C55E"
  },

  {
    label:
      "Fast Delivery",

    icon:
      Truck,

    color:
      "#8B5CF6"
  },

  {
    label:
      "Secure",

    icon:
      ShieldCheck,

    color:
      "#EC4899"
  }
]

// ============================================================
// FILTERS
// ============================================================

const FILTERS = [

  {
    label:
      "OEM",

    color:
      "#2563EB"
  },

  {
    label:
      "Aftermarket",

    color:
      "#8B5CF6"
  },

  {
    label:
      "Used",

    color:
      "#F59E0B"
  },

  {
    label:
      "International",

    color:
      "#06B6D4"
  },

  {
    label:
      "Expedition",

    color:
      "#22C55E"
  },

  {
    label:
      "Recovery",

    color:
      "#EF4444"
  }
]

// ============================================================
// COMPONENT
// ============================================================

export default function ProcurementQuickFilters(){

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    selected,
    setSelected
  ] = useState<string[]>([
    "OEM",
    "Expedition"
  ])

  // ==========================================================
  // TOGGLE
  // ==========================================================

  function toggle(
    label: string
  ){

    if(selected.includes(label)){

      setSelected(

        selected.filter(
          item => item !== label
        )
      )

      return
    }

    setSelected([
      ...selected,
      label
    ])
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        space-y-5
      "
    >

      {/* ==================================================== */}
      {/* TRUST */}
      {/* ==================================================== */}

      <div
        className="
          flex
          flex-wrap
          gap-3
        "
      >

        {TRUST_CHIPS.map((chip)=>{

          const Icon =
            chip.icon

          return (

            <div

              key={chip.label}

              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-2
                text-sm
                font-bold
              "

              style={{

                background:
                  `${chip.color}12`,

                borderColor:
                  `${chip.color}35`,

                color:
                  chip.color,

                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.18)"
              }}
            >

              <Icon size={15} />

              {chip.label}

            </div>
          )
        })}

      </div>

      {/* ==================================================== */}
      {/* CONTROLS */}
      {/* ==================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >

        {/* ================================================== */}
        {/* FILTERS */}
        {/* ================================================== */}

        {FILTERS.map((filter)=>{

          const active =
            selected.includes(
              filter.label
            )

          return (

            <button

              key={filter.label}

              onClick={()=>{
                toggle(filter.label)
              }}

              className="
                rounded-xl
                border
                px-4
                py-2
                text-sm
                font-bold
                transition-all
                duration-200
              "

              style={{

                background:
                  active
                    ? `${filter.color}18`
                    : tacticalColors.surfaceElevated,

                borderColor:
                  active
                    ? `${filter.color}50`
                    : tacticalColors.border,

                color:
                  active
                    ? filter.color
                    : tacticalColors.textPrimary,

                boxShadow:
                  active
                    ? `0 10px 20px ${filter.color}20`
                    : "0 8px 18px rgba(0,0,0,0.18)"
              }}
            >
              {filter.label}
            </button>
          )
        })}

        {/* ================================================== */}
        {/* VEHICLE */}
        {/* ================================================== */}

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-semibold
          "

          style={{

            background:
              "rgba(34,197,94,0.10)",

            borderColor:
              "rgba(34,197,94,0.30)",

            color:
              "#4ADE80"
          }}
        >

          <Wrench size={15} />

          Defender 110 300Tdi

        </button>

        {/* ================================================== */}
        {/* CLOSE TO ME */}
        {/* ================================================== */}

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-semibold
          "

          style={{

            background:
              "rgba(59,130,246,0.12)",

            borderColor:
              "rgba(59,130,246,0.35)",

            color:
              "#60A5FA"
          }}
        >

          <MapPin size={15} />

          Close To Me

        </button>

        {/* ================================================== */}
        {/* AU */}
        {/* ================================================== */}

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            font-semibold
          "

          style={{

            background:
              "rgba(234,179,8,0.12)",

            borderColor:
              "rgba(234,179,8,0.35)",

            color:
              "#FACC15"
          }}
        >

          <ShieldAlert size={15} />

          AU Priority

        </button>

        {/* ================================================== */}
        {/* ACTIONS */}
        {/* ================================================== */}

        <div
          className="
            ml-auto
            flex
            flex-wrap
            gap-3
          "
        >

          {/* ============================================== */}
          {/* SORT */}
          {/* ============================================== */}

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2
              text-sm
              font-semibold
            "

            style={{

              background:
                tacticalColors.surfaceElevated,

              borderColor:
                tacticalColors.border,

              color:
                tacticalColors.textPrimary
            }}
          >

            <TimerReset size={15} />

            Best Match

            <ChevronDown size={15} />

          </button>

          {/* ============================================== */}
          {/* REGION */}
          {/* ============================================== */}

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2
              text-sm
              font-semibold
            "

            style={{

              background:
                tacticalColors.surfaceElevated,

              borderColor:
                tacticalColors.border,

              color:
                tacticalColors.textPrimary
            }}
          >

            <Globe2 size={15} />

            Australia

          </button>

          {/* ============================================== */}
          {/* EMAIL */}
          {/* ============================================== */}

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2
              text-sm
              font-semibold
            "

            style={{

              background:
                tacticalColors.surfaceElevated,

              borderColor:
                tacticalColors.border,

              color:
                tacticalColors.textPrimary
            }}
          >

            <Mail size={15} />

            Email

          </button>

          {/* ============================================== */}
          {/* PRINT */}
          {/* ============================================== */}

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              px-4
              py-2
              text-sm
              font-semibold
            "

            style={{

              background:
                tacticalColors.surfaceElevated,

              borderColor:
                tacticalColors.border,

              color:
                tacticalColors.textPrimary
            }}
          >

            <Printer size={15} />

            Print

          </button>

        </div>

      </div>

    </div>
  )
}