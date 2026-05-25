/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\vehicle\SavedVehicleGarage.tsx
 *
 * Timestamp:
 * 23 May 2026 12:18 Sydney
 *
 * PURPOSE:
 * Saved Defender Vehicle Garage
 *
 * STRATEGY:
 * PASS 34 — Predictive Operational Intelligence
 *
 * OBJECTIVES:
 * - persistent VIN management
 * - operational vehicle switching
 * - removable VIN garage entries
 * - tactical fleet intelligence
 * - expedition vehicle persistence
 *
 * ============================================================
 */

"use client"

import {

  Car,
  Trash2,
  Shield,
  Gauge,
  Calendar,
  Cpu

} from "lucide-react"

import {

  useVehicleContext

} from "@/contexts/VehicleContext"

// ============================================================
// COMPONENT
// ============================================================

export default function SavedVehicleGarage(){

  const {

    vin,
    savedVehicles,
    setVin,
    removeSavedVehicle

  } = useVehicleContext()

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    savedVehicles.length === 0

  ){

    return null
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      className="
        rounded-[28px]
        border
        border-slate-800
        bg-[#07101F]
        p-5
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
          gap-4
        "
      >

        <div>

          <div
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.22em]
              text-[#38BDF8]
            "
          >
            Operational Vehicle Garage
          </div>

          <div
            className="
              mt-2
              text-[24px]
              font-black
              tracking-[-0.04em]
              text-white
            "
          >
            Saved Defender VINs
          </div>

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-[#1D4ED8]
            bg-[#071B46]
          "
        >

          <Car
            className="
              h-7
              w-7
              text-[#60A5FA]
            "
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* VEHICLES */}
      {/* ==================================================== */}

      <div
        className="
          mt-5
          flex
          flex-wrap
          gap-4
        "
      >

        {

          savedVehicles.map(vehicle => {

            const active =
              vehicle.vin === vin

            return (

              <button
                key={vehicle.vin}
                type="button"
                onClick={() => setVin(vehicle.vin)}
                className={`
                  relative
                  min-w-[320px]
                  rounded-[24px]
                  border
                  p-5
                  text-left
                  transition-all

                  ${
                    active

                    ?

                    `
                    border-[#2563EB]
                    bg-[#0B1D46]
                    shadow-[0_0_24px_rgba(37,99,235,0.25)]
                    `

                    :

                    `
                    border-slate-800
                    bg-[#050C18]
                    hover:border-slate-700
                    hover:bg-[#091224]
                    `
                  }
                `}
              >

                {/* =========================================== */}
                {/* REMOVE */}
                {/* =========================================== */}

                <div
                  className="
                    absolute
                    right-3
                    top-3
                  "
                >

                  <button
                    type="button"
                    onClick={(event) => {

                      event.stopPropagation()

                      removeSavedVehicle(
                        vehicle.vin
                      )
                    }}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-red-900/60
                      bg-red-950/40
                      transition-all
                      hover:bg-red-900
                    "
                  >

                    <Trash2
                      className="
                        h-4
                        w-4
                        text-red-300
                      "
                    />

                  </button>

                </div>

                {/* =========================================== */}
                {/* PLATFORM */}
                {/* =========================================== */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-slate-700
                      bg-[#07101F]
                    "
                  >

                    <Shield
                      className="
                        h-6
                        w-6
                        text-[#60A5FA]
                      "
                    />

                  </div>

                  <div>

                    <div
                      className="
                        text-[18px]
                        font-black
                        tracking-[-0.03em]
                        text-white
                      "
                    >
                      {vehicle.platform}
                    </div>

                    <div
                      className="
                        mt-1
                        text-[12px]
                        font-semibold
                        text-slate-400
                      "
                    >
                      {vehicle.body}
                    </div>

                  </div>

                </div>

                {/* =========================================== */}
                {/* VIN */}
                {/* =========================================== */}

                <div
                  className="
                    mt-5
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#07101F]
                    px-4
                    py-3
                  "
                >

                  <div
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-slate-500
                    "
                  >
                    VIN
                  </div>

                  <div
                    className="
                      mt-2
                      break-all
                      text-[13px]
                      font-black
                      tracking-[0.08em]
                      text-[#4ADE80]
                    "
                  >
                    {vehicle.vin}
                  </div>

                </div>

                {/* =========================================== */}
                {/* METRICS */}
                {/* =========================================== */}

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-3
                    gap-3
                  "
                >

                  <Metric
                    icon={
                      <Cpu className="h-4 w-4" />
                    }
                    label="Engine"
                    value={vehicle.engine}
                  />

                  <Metric
                    icon={
                      <Calendar className="h-4 w-4" />
                    }
                    label="Year"
                    value={String(vehicle.year)}
                  />

                  <Metric
                    icon={
                      <Gauge className="h-4 w-4" />
                    }
                    label="Expedition"
                    value={String(vehicle.expeditionScore)}
                  />

                </div>

              </button>
            )
          })
        }

      </div>

    </section>
  )
}

// ============================================================
// METRIC
// ============================================================

function Metric({

  icon,
  label,
  value

}: {

  icon: React.ReactNode

  label: string

  value: string

}){

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        p-3
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div
          className="
            text-[#60A5FA]
          "
        >
          {icon}
        </div>

        <div
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.12em]
            text-slate-500
          "
        >
          {label}
        </div>

      </div>

      <div
        className="
          mt-3
          text-[14px]
          font-black
          text-white
        "
      >
        {value}
      </div>

    </div>
  )
}