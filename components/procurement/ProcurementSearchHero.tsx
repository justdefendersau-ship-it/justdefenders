/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\ProcurementSearchHero.tsx
 *
 * Timestamp:
 * 24 May 2026 01:08 Sydney
 *
 * PURPOSE:
 * Tactical Operational Procurement Command Surface
 *
 * STRATEGY:
 * PASS 46A.1 — Tactical Top-Bar Reconstruction
 *
 * OBJECTIVES:
 * - tactical operational command surface
 * - dense procurement federation controls
 * - integrated vehicle intelligence rail
 * - tactical telemetry compression
 * - operational procurement filtering
 * - responsive tactical orchestration
 * - target-state dashboard alignment
 *
 * ============================================================
 */

"use client"

import {

  Car,
  CheckCircle2,
  Clock3,
  Globe,
  Search,
  Shield,
  SlidersHorizontal,
  Truck,
  Wrench

} from "lucide-react"

import {

  useMemo

} from "react"

// ============================================================
// TYPES
// ============================================================

interface ProcurementSearchHeroProps {

  query: string

  setQuery:
    (value: string) => void

  onSearch:
    () => void

  selectedVIN?: string

  selectedVehicle?: string

  selectedEngine?: string

  selectedYear?: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function ProcurementSearchHero({

  query,
  setQuery,
  onSearch,
  selectedVIN,
  selectedVehicle = "Defender 110",
  selectedEngine = "Td5",
  selectedYear = "1999"

}: ProcurementSearchHeroProps){

  // ==========================================================
  // VEHICLE LABEL
  // ==========================================================

  const vehicleLabel =
    useMemo(() => {

      if (!selectedVIN){

        return "No Operational Vehicle"
      }

      return `${selectedEngine} ${selectedVehicle} ${selectedYear}`

    }, [

      selectedVIN,
      selectedEngine,
      selectedVehicle,
      selectedYear
    ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        rounded-[34px]
        border
        border-slate-800
        bg-[#07101F]
        overflow-hidden
      "
    >

      {/* ==================================================== */}
      {/* TOP OPERATIONAL RAIL */}
      {/* ==================================================== */}

      <div
        className="
          flex
          flex-col
          gap-6
          border-b
          border-slate-800
          bg-[#020817]
          px-6
          py-5

          2xl:flex-row
          2xl:items-center
          2xl:justify-between
        "
      >

        {/* ================================================== */}
        {/* LEFT */}
        {/* ================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
          "
        >

          {/* =============================================== */}
          {/* BRAND */}
          {/* =============================================== */}

          <div>

            <div
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.34em]
                text-[#38BDF8]
              "
            >
              Operational Parts Intelligence
            </div>

            <div
              className="
                mt-2
                text-[48px]
                font-black
                tracking-[-0.08em]
                text-white
              "
            >
              JustDefenders©
            </div>

          </div>

          {/* =============================================== */}
          {/* DESCRIPTION */}
          {/* =============================================== */}

          <div
            className="
              max-w-[900px]
              text-[13px]
              leading-relaxed
              text-slate-400
            "
          >
            Tactical Land Rover Defender procurement federation
            platform with operational intelligence,
            expedition readiness analysis,
            VIN-aware procurement telemetry,
            and predictive maintenance orchestration.
          </div>

        </div>

        {/* ================================================== */}
        {/* TELEMETRY */}
        {/* ================================================== */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-4
          "
        >

          <TelemetryChip
            label="Federation"
            value="LIVE"
            icon={
              <Globe className="h-4 w-4" />
            }
            status="success"
          />

          <TelemetryChip
            label="Latency"
            value="69ms"
            icon={
              <Clock3 className="h-4 w-4" />
            }
            status="info"
          />

          <TelemetryChip
            label="Vehicle"
            value={selectedVIN ? vehicleLabel : "None"}
            icon={
              <Car className="h-4 w-4" />
            }
            status="success"
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* SEARCH CONTROL SURFACE */}
      {/* ==================================================== */}

      <div
        className="
          px-6
          py-6
        "
      >

        {/* ================================================== */}
        {/* SEARCH ROW */}
        {/* ================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5

            2xl:flex-row
          "
        >

          {/* =============================================== */}
          {/* SEARCH */}
          {/* =============================================== */}

          <div
            className="
              relative
              flex-1
            "
          >

            <Search
              className="
                absolute
                left-6
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="
                Search OEM numbers, Defender parts,
                supplier SKUs, expedition components...
              "
              className="
                h-[70px]
                w-full
                rounded-[26px]
                border
                border-slate-800
                bg-[#020817]
                pl-16
                pr-6
                text-[22px]
                font-black
                tracking-[-0.04em]
                text-white
                outline-none
                transition-all
                placeholder:text-slate-600
                focus:border-cyan-800
              "
            />

          </div>

          {/* =============================================== */}
          {/* VEHICLE */}
          {/* =============================================== */}

          <div
            className="
              flex
              flex-wrap
              gap-4
            "
          >

            <VehicleSelector
              label="Vehicle"
              value={selectedVehicle}
            />

            <VehicleSelector
              label="Engine"
              value={selectedEngine}
            />

            <VehicleSelector
              label="Year"
              value={selectedYear}
            />

          </div>

          {/* =============================================== */}
          {/* BUTTON */}
          {/* =============================================== */}

          <button
            onClick={onSearch}
            className="
              inline-flex
              h-[70px]
              items-center
              justify-center
              gap-4
              rounded-[24px]
              border
              border-cyan-800
              bg-cyan-600
              px-10
              text-[13px]
              font-black
              uppercase
              tracking-[0.18em]
              text-white
              transition-all
              hover:scale-[1.02]
              hover:bg-cyan-500
            "
          >

            <Search className="h-5 w-5" />

            Search

          </button>

        </div>

        {/* ================================================== */}
        {/* PROCUREMENT FILTERS */}
        {/* ================================================== */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            gap-3
          "
        >

          <FilterChip
            label="OEM"
            active
          />

          <FilterChip
            label="Aftermarket"
          />

          <FilterChip
            label="Used"
          />

          <FilterChip
            label="International"
          />

          <FilterChip
            label="Expedition"
          />

          <FilterChip
            label="Trade"
          />

          <FilterChip
            label="Close To Me"
          />

          <FilterChip
            label="AU Priority"
            active
          />

          <FilterChip
            label="Verified"
            active
          />

          <FilterChip
            label="In Stock"
            active
          />

          <FilterChip
            label="Fast Delivery"
          />

          <FilterChip
            label="Secure"
          />

          {/* =============================================== */}
          {/* ACTIONS */}
          {/* =============================================== */}

          <button
            className="
              inline-flex
              items-center
              gap-3
              rounded-[16px]
              border
              border-slate-700
              bg-[#020817]
              px-5
              py-3
              text-[11px]
              font-black
              uppercase
              tracking-[0.16em]
              text-white
            "
          >

            <SlidersHorizontal className="h-4 w-4" />

            More Filters

          </button>

          <button
            className="
              inline-flex
              items-center
              gap-3
              rounded-[16px]
              border
              border-cyan-800
              bg-cyan-950/30
              px-5
              py-3
              text-[11px]
              font-black
              uppercase
              tracking-[0.16em]
              text-cyan-300
            "
          >

            <Truck className="h-4 w-4" />

            Open Procurement List

          </button>

        </div>

      </div>

    </div>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryChip({

  icon,
  label,
  value,
  status

}: {

  icon: React.ReactNode

  label: string

  value: string

  status:
    "success"
    |
    "warning"
    |
    "info"
}){

  return (

    <div
      className="
        rounded-[20px]
        border
        border-slate-800
        bg-[#07101F]
        px-5
        py-4
        min-w-[140px]
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <div
          className={`

            ${

              status === "success"

              ?

              "text-[#4ADE80]"

              :

              status === "warning"

              ?

              "text-[#F59E0B]"

              :

              "text-[#38BDF8]"
            }
          `}
        >
          {icon}
        </div>

        <div
          className="
            flex-1
          "
        >

          <div
            className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.22em]
              text-slate-500
            "
          >
            {label}
          </div>

          <div
            className="
              mt-1
              text-[14px]
              font-black
              uppercase
              tracking-[0.08em]
              text-white
            "
          >
            {value}
          </div>

        </div>

      </div>

    </div>
  )
}

// ============================================================
// FILTER
// ============================================================

function FilterChip({

  label,
  active = false

}: {

  label: string

  active?: boolean

}){

  return (

    <button
      className={`
        inline-flex
        items-center
        gap-2
        rounded-[16px]
        border
        px-4
        py-3
        text-[10px]
        font-black
        uppercase
        tracking-[0.18em]
        transition-all

        ${

          active

          ?

          `
          border-cyan-800
          bg-cyan-950/20
          text-cyan-300
          `

          :

          `
          border-slate-700
          bg-[#020817]
          text-slate-400
          hover:border-slate-600
          hover:text-white
          `
        }
      `}
    >

      {

        active

        &&

        <CheckCircle2 className="h-3.5 w-3.5" />
      }

      {label}

    </button>
  )
}

// ============================================================
// VEHICLE SELECTOR
// ============================================================

function VehicleSelector({

  label,
  value

}: {

  label: string

  value: string

}){

  return (

    <button
      className="
        inline-flex
        h-[70px]
        min-w-[160px]
        flex-col
        items-start
        justify-center
        rounded-[24px]
        border
        border-slate-800
        bg-[#020817]
        px-5
        transition-all
        hover:border-slate-700
      "
    >

      <div
        className="
          text-[9px]
          font-black
          uppercase
          tracking-[0.22em]
          text-slate-500
        "
      >
        {label}
      </div>

      <div
        className="
          mt-2
          flex
          items-center
          gap-3
          text-[14px]
          font-black
          text-white
        "
      >

        {

          label === "Vehicle"

          ?

          <Truck className="h-4 w-4 text-[#38BDF8]" />

          :

          label === "Engine"

          ?

          <Wrench className="h-4 w-4 text-[#38BDF8]" />

          :

          <Shield className="h-4 w-4 text-[#38BDF8]" />
        }

        {value}

      </div>

    </button>
  )
}