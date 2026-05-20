/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\ProcurementSearchHero.tsx
 *
 * Timestamp:
 * 19 May 2026 11:10 Sydney
 *
 * PURPOSE:
 * Sticky Operational Procurement Command Bar
 *
 * STRATEGY:
 * High-density operational procurement UX.
 *
 * IMPORTANT:
 * - sticky procurement controls
 * - persistent filtering
 * - compressed operational layout
 * - procurement workstation UX
 * ============================================================
 */

"use client"

import {
  Car,
  ChevronDown,
  Mail,
  Printer,
  ScanLine,
  Search,
  ShieldCheck,
  Wrench,
  Globe2,
  Package,
  Truck,
  MapPin,
  Shield,
  Filter
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

import {
  useProcurement
} from "@/contexts/ProcurementContext"

import {
  DEFENDER_CONFIGURATIONS
} from "@/data/vehicles/defenderConfigurations"

import { useMemo } from "react"

// ============================================================
// COMPONENT
// ============================================================

export default function ProcurementSearchHero(){

  const {

    mode,
    setMode,

    vehicle,
    setVehicle,

    vin,
    setVin

  } = useProcurement()

  // ==========================================================
  // MODELS
  // ==========================================================

  const models =
    useMemo(()=>{

      return Array.from(

        new Set(

          DEFENDER_CONFIGURATIONS.map(
            config => config.model
          )
        )
      )

    },[])

  // ==========================================================
  // ENGINES
  // ==========================================================

  const engines =
    useMemo(()=>{

      return Array.from(

        new Set(

          DEFENDER_CONFIGURATIONS

            .filter(

              config =>
                config.model === vehicle.model
            )

            .map(
              config => config.engine
            )
        )
      )

    },[
      vehicle.model
    ])

  // ==========================================================
  // YEARS
  // ==========================================================

  const years =
    useMemo(()=>{

      return Array.from(

        new Set(

          DEFENDER_CONFIGURATIONS

            .filter(

              config =>

                config.model === vehicle.model
                &&
                config.engine === vehicle.engine
            )

            .map(
              config => config.years
            )
        )
      )

    },[
      vehicle.model,
      vehicle.engine
    ])

  // ==========================================================
  // UPDATE
  // ==========================================================

  function updateModel(
    model: string
  ){

    const config =
      DEFENDER_CONFIGURATIONS.find(

        item =>
          item.model === model
      )

    if(!config){
      return
    }

    setVehicle({

      model,

      engine:
        config.engine,

      years:
        config.years
    })
  }

  function updateEngine(
    engine: string
  ){

    const config =
      DEFENDER_CONFIGURATIONS.find(

        item =>

          item.model === vehicle.model
          &&
          item.engine === engine
      )

    if(!config){
      return
    }

    setVehicle({

      ...vehicle,

      engine,

      years:
        config.years
    })
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        sticky
        top-0
        z-[100]
        border-b
        backdrop-blur-xl
      "

      style={{

        background:
          "rgba(2,6,23,0.96)",

        borderColor:
          tacticalColors.border,

        boxShadow:
          "0 10px 40px rgba(0,0,0,0.45)"
      }}
    >

      {/* ==================================================== */}
      {/* ROW 1 */}
      {/* ==================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          px-6
          py-4
        "

        style={{
          borderColor:
            tacticalColors.border
        }}
      >

        {/* ================================================== */}
        {/* BRAND */}
        {/* ================================================== */}

        <div
          className="
            flex
            items-center
            gap-6
          "
        >

          <div>

            <div
              className="
                text-[30px]
                font-black
                leading-none
              "

              style={{

                color:
                  "#A3A3A3",

                fontFamily:
                  "Arial, Helvetica, sans-serif",

                textShadow:
                  `
                  0 1px 0 rgba(255,255,255,0.06),
                  0 2px 12px rgba(0,0,0,0.45)
                  `
              }}
            >
              JustDefenders©
            </div>

          </div>

          <div
            className="
              hidden
              lg:block
            "
          >

            <div
              className="
                text-sm
                font-black
                uppercase
                tracking-[0.16em]
              "

              style={{
                color:
                  "#60A5FA"
              }}
            >
              Parts Intelligence
            </div>

          </div>

        </div>

        {/* ================================================== */}
        {/* MODES */}
        {/* ================================================== */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <ModeButton

            active={
              mode === "vehicle"
            }

            onClick={()=>{
              setMode("vehicle")
            }}

            icon={<Car size={15} />}

            label="Vehicle"

            color="#2563EB"
          />

          <ModeButton

            active={
              mode === "vin"
            }

            onClick={()=>{
              setMode("vin")
            }}

            icon={<ScanLine size={15} />}

            label="VIN"

            color="#059669"
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* ROW 2 */}
      {/* ==================================================== */}

      <div
        className="
          border-b
          px-6
          py-4
        "

        style={{
          borderColor:
            tacticalColors.border
        }}
      >

        <div
          className="
            flex
            flex-col
            gap-4
            xl:flex-row
            xl:items-center
          "
        >

          {/* ================================================= */}
          {/* SEARCH */}
          {/* ================================================= */}

          <div
            className="
              flex-1
              xl:max-w-[700px]
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                px-4
                py-3
              "

              style={{

                background:
                  tacticalColors.surface,

                borderColor:
                  tacticalColors.border
              }}
            >

              <Search
                size={18}
                color={
                  tacticalColors.textMuted
                }
              />

              <input

                value={
                  mode === "vin"
                    ? vin
                    : undefined
                }

                onChange={(event)=>{

                  if(mode === "vin"){

                    setVin(
                      event.target.value
                    )
                  }
                }}

                placeholder={
                  mode === "vin"
                    ? "Enter VIN..."
                    : "Search Defender parts, OEM numbers..."
                }

                className="
                  w-full
                  bg-transparent
                  text-sm
                  outline-none
                "

                style={{
                  color:
                    tacticalColors.textPrimary
                }}
              />

            </div>

          </div>

          {/* ================================================= */}
          {/* VEHICLE */}
          {/* ================================================= */}

          {mode === "vehicle" && (

            <>

              <SelectBox
                value={vehicle.model}
                options={models}
                onChange={updateModel}
              />

              <SelectBox
                value={vehicle.engine}
                options={engines}
                onChange={updateEngine}
              />

              <SelectBox
                value={vehicle.years}
                options={years}
                onChange={(value)=>{

                  setVehicle({

                    ...vehicle,

                    years: value
                  })
                }}
              />

            </>
          )}

          {/* ================================================= */}
          {/* SEARCH */}
          {/* ================================================= */}

          <button
            className="
              rounded-2xl
              px-6
              py-3
              text-sm
              font-black
            "

            style={{

              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8)",

              color:
                tacticalColors.textPrimary
            }}
          >
            Search
          </button>

        </div>

      </div>

      {/* ==================================================== */}
      {/* ROW 3 */}
      {/* ==================================================== */}

      <div
        className="
          px-6
          py-4
        "
      >

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >

          <CommandChip
            icon={<ShieldCheck size={14} />}
            label="OEM"
            color="#2563EB"
            tooltip="JLR validated OEM procurement"
          />

          <CommandChip
            icon={<Wrench size={14} />}
            label="Aftermarket"
            color="#FFFFFF"
            tooltip="Aftermarket compatible suppliers"
          />

          <CommandChip
            icon={<Package size={14} />}
            label="Used"
            color="#9CA3AF"
            tooltip="Used and refurbished components"
          />

          <CommandChip
            icon={<Globe2 size={14} />}
            label="International"
            color="#8B5CF6"
            tooltip="Enable UK and international sourcing"
          />

          <CommandChip
            icon={<Truck size={14} />}
            label="Expedition"
            color="#22C55E"
            tooltip="Remote-area expedition prioritisation"
          />

          <CommandChip
            icon={<MapPin size={14} />}
            label="Close To Me"
            color="#2563EB"
            tooltip="Nearby physical supplier preference"
          />

          <CommandChip
            icon={<Shield size={14} />}
            label="AU Priority"
            color="#F59E0B"
            tooltip="Australian suppliers prioritised"
          />

          <div
            className="
              ml-auto
              flex
              items-center
              gap-3
            "
          >

            <CommandChip
              icon={<Filter size={14} />}
              label="More Filters"
              color="#FFFFFF"
              tooltip="Advanced procurement filters"
            />

            <CommandChip
              icon={<Mail size={14} />}
              label="Email"
              color="#2563EB"
              tooltip="Email procurement results"
            />

            <CommandChip
              icon={<Printer size={14} />}
              label="Print"
              color="#22C55E"
              tooltip="Print procurement report"
            />

          </div>

        </div>

      </div>

    </div>
  )
}

// ============================================================
// MODE BUTTON
// ============================================================

function ModeButton({
  active,
  onClick,
  icon,
  label,
  color
}:{
  active: boolean
  onClick: ()=>void
  icon: React.ReactNode
  label: string
  color: string
}){

  return (

    <button

      onClick={onClick}

      title={label}

      className="
        flex
        items-center
        gap-2
        rounded-2xl
        border
        px-4
        py-3
        text-sm
        font-bold
      "

      style={{

        background:
          active
            ? `${color}18`
            : tacticalColors.surface,

        borderColor:
          active
            ? `${color}45`
            : tacticalColors.border,

        color:
          active
            ? color
            : tacticalColors.textPrimary
      }}
    >

      {icon}

      {label}

    </button>
  )
}

// ============================================================
// CHIP
// ============================================================

function CommandChip({
  icon,
  label,
  color,
  tooltip
}:{
  icon: React.ReactNode
  label: string
  color: string
  tooltip: string
}){

  return (

    <button

      title={tooltip}

      className="
        flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2
        text-sm
        font-bold
      "

      style={{

        background:
          `${color}12`,

        borderColor:
          `${color}35`,

        color
      }}
    >

      {icon}

      {label}

    </button>
  )
}

// ============================================================
// SELECT
// ============================================================

function SelectBox({
  value,
  options,
  onChange
}:{
  value: string
  options: string[]
  onChange: (value:string)=>void
}){

  return (

    <div
      className="
        relative
      "
    >

      <select

        value={value}

        onChange={(event)=>{

          onChange(
            event.target.value
          )
        }}

        className="
          appearance-none
          rounded-2xl
          border
          px-4
          py-3
          pr-10
          text-sm
          font-semibold
          outline-none
        "

        style={{

          background:
            tacticalColors.surface,

          borderColor:
            tacticalColors.border,

          color:
            tacticalColors.textPrimary
        }}
      >

        {options.map((option)=>{

          return (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        })}

      </select>

      <ChevronDown
        size={15}

        style={{

          position:
            "absolute",

          right:
            14,

          top:
            "50%",

          transform:
            "translateY(-50%)",

          color:
            tacticalColors.textMuted,

          pointerEvents:
            "none"
        }}
      />

    </div>
  )
}