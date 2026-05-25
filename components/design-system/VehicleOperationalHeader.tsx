/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\design-system\VehicleOperationalHeader.tsx
 *
 * Timestamp:
 * 24 May 2026 15:33 Sydney
 *
 * PURPOSE:
 * Vehicle Operational Header
 *
 * STRATEGY:
 * PASS 46 / PASS 47 Production Stabilization
 *
 * OBJECTIVES:
 * - production-safe vehicle telemetry
 * - resilient operational header rendering
 * - expedition-grade vehicle identity
 * - stable federation-safe vehicle state
 *
 * ============================================================
 */

"use client"

import {

  Car,
  Gauge,
  ShieldCheck,
  Wrench

} from "lucide-react"

import {

  useMemo

} from "react"

import {

  useVehicleContext

} from "@/contexts/VehicleContext"

// ============================================================
// COMPONENT
// ============================================================

export default function VehicleOperationalHeader(){

  // ==========================================================
  // VEHICLE CONTEXT
  // ==========================================================

  const vehicleContext =
    useVehicleContext()

  // ==========================================================
  // SAFE DERIVATION
  // ==========================================================

  const telemetry =
    useMemo(() => {

      return {

        name:

          (
            vehicleContext as any
          )?.currentVehicle?.name

          ||

          (
            vehicleContext as any
          )?.selectedVehicle?.name

          ||

          "Land Rover Defender",

        platform:

          (
            vehicleContext as any
          )?.currentVehicle?.platform

          ||

          (
            vehicleContext as any
          )?.selectedVehicle?.platform

          ||

          "Defender Platform",

        engine:

          (
            vehicleContext as any
          )?.currentVehicle?.engine

          ||

          (
            vehicleContext as any
          )?.selectedVehicle?.engine

          ||

          "TDCi 2.2",

        expeditionStatus:
          "OPERATIONAL",

        federationHealth:
          "HEALTHY"

      }

    }, [vehicleContext])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        rounded-[32px]
        border
        border-slate-800
        bg-[#07101F]
        p-6
      "
    >

      {/* ==================================================== */}
      {/* TOP */}
      {/* ==================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-start
          justify-between
          gap-6
        "
      >

        {/* ================================================== */}
        {/* LEFT */}
        {/* ================================================== */}

        <div>

          <div
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.22em]
              text-cyan-400
            "
          >
            Vehicle Intelligence Nerve Centre
          </div>

          <h1
            className="
              mt-3
              text-[38px]
              font-black
              tracking-[-0.08em]
              text-white
            "
          >
            {telemetry.name}
          </h1>

          <div
            className="
              mt-4
              max-w-[720px]
              text-[15px]
              leading-relaxed
              text-slate-400
            "
          >
            Expedition-grade tactical vehicle
            intelligence and procurement federation
            orchestration platform.
          </div>

        </div>

        {/* ================================================== */}
        {/* STATUS */}
        {/* ================================================== */}

        <div
          className="
            rounded-[24px]
            border
            border-emerald-800
            bg-emerald-950/20
            px-5
            py-4
          "
        >

          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-emerald-300
            "
          >
            Expedition Status
          </div>

          <div
            className="
              mt-2
              text-[24px]
              font-black
              tracking-[-0.08em]
              text-emerald-200
            "
          >
            {telemetry.expeditionStatus}
          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* METRICS */}
      {/* ==================================================== */}

      <div
        className="
          mt-6
          grid
          gap-4

          md:grid-cols-2

          xl:grid-cols-4
        "
      >

        <TelemetryTile

          icon={Car}

          label="Platform"

          value={telemetry.platform}

          color="
            text-cyan-300
          "
        />

        <TelemetryTile

          icon={Gauge}

          label="Engine"

          value={telemetry.engine}

          color="
            text-emerald-300
          "
        />

        <TelemetryTile

          icon={ShieldCheck}

          label="Federation"

          value={telemetry.federationHealth}

          color="
            text-amber-300
          "
        />

        <TelemetryTile

          icon={Wrench}

          label="Procurement"

          value="TACTICAL"

          color="
            text-violet-300
          "
        />

      </div>

    </div>
  )
}

// ============================================================
// TILE
// ============================================================

function TelemetryTile({

  icon: Icon,
  label,
  value,
  color

}: {

  icon: any

  label: string

  value: string

  color: string

}){

  return (

    <div
      className="
        rounded-[22px]
        border
        border-slate-800
        bg-[#020817]
        p-5
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
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-slate-500
          "
        >
          {label}
        </div>

        <Icon
          className={`
            h-5
            w-5
            ${color}
          `}
        />

      </div>

      <div
        className={`

          mt-4
          text-[22px]
          font-black
          tracking-[-0.08em]

          ${color}
        `}
      >
        {value}
      </div>

    </div>
  )
}