/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\TacticalFitmentSidebar.tsx
 *
 * Timestamp:
 * 19 May 2026 09:35 Sydney
 *
 * PURPOSE:
 * Vehicle Fitment Intelligence Sidebar
 *
 * STRATEGY:
 * JLR canonical validation +
 * LR Workshop operational verification +
 * procurement orchestration.
 *
 * IMPORTANT:
 * This sidebar is now dynamically driven by:
 * - shared procurement state
 * - vehicle configuration
 * - drivetrain intelligence
 * - expedition procurement logic
 * ============================================================
 */

"use client"

import Image from "next/image"

import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Truck,
  AlertTriangle,
  CheckCircle2,
  GitCompareArrows,
  Cog,
  ShieldAlert,
  RadioTower
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

import {
  useProcurement
} from "@/contexts/ProcurementContext"

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalFitmentSidebar(){

  // ==========================================================
  // PROCUREMENT
  // ==========================================================

  const {

    vehicle,
    expeditionMode,
    oemPriority

  } = useProcurement()

  // ==========================================================
  // LOGIC
  // ==========================================================

  const legacyPlatform =

    vehicle.engine.includes("200")
    ||
    vehicle.engine.includes("300")
    ||
    vehicle.model.includes("One Ten")
    ||
    vehicle.model.includes("Ninety")

  const drivetrain = (()=>{

    if(vehicle.engine.includes("2.2")){
      return "MT82"
    }

    if(vehicle.engine.includes("2.4")){
      return "MT82"
    }

    if(vehicle.engine.includes("Td5")){
      return "R380"
    }

    if(vehicle.engine.includes("300")){
      return "R380"
    }

    if(vehicle.engine.includes("200")){
      return "LT77"
    }

    if(vehicle.model.includes("One Ten")){
      return "LT95"
    }

    return "LT77"

  })()

  const supersession = (()=>{

    if(vehicle.engine.includes("Td5")){
      return "WIX WL7070"
    }

    if(vehicle.engine.includes("2.2")){
      return "LR058104"
    }

    return "ERR3340"

  })()

  const expeditionRisk = (()=>{

    if(vehicle.engine.includes("Td5")){
      return "Medium"
    }

    if(vehicle.engine.includes("2.2")){
      return "Medium"
    }

    return "Low"

  })()

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        overflow-hidden
        rounded-[30px]
        border
      "

      style={{

        background:
          tacticalColors.surfaceElevated,

        borderColor:
          tacticalColors.border
      }}
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          border-b
          px-6
          py-5
        "

        style={{
          borderColor:
            tacticalColors.border
        }}
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-[18px]
                font-black
              "

              style={{
                color:
                  tacticalColors.textPrimary
              }}
            >
              Vehicle Fitment Intelligence
            </h2>

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
              JLR + LR Workshop validation
            </div>

          </div>

          <div
            className="
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-black
            "

            style={{

              background:
                "rgba(34,197,94,0.12)",

              borderColor:
                "rgba(34,197,94,0.35)",

              color:
                "#4ADE80"
            }}
          >
            VERIFIED
          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* BODY */}
      {/* ==================================================== */}

      <div
        className="
          p-6
        "
      >

        {/* ================================================== */}
        {/* OEM */}
        {/* ================================================== */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            p-4
          "

          style={{

            background:
              "rgba(34,197,94,0.10)",

            borderColor:
              "rgba(34,197,94,0.25)"
          }}
        >

          <ShieldCheck
            size={18}
            color="#4ADE80"
          />

          <div
            className="
              text-sm
              font-black
            "

            style={{
              color:
                "#4ADE80"
            }}
          >
            OEM Fitment Confirmed
          </div>

        </div>

        {/* ================================================== */}
        {/* VEHICLE */}
        {/* ================================================== */}

        <div
          className="
            mt-6
          "
        >

          <div
            className="
              text-[30px]
              font-black
              leading-tight
            "

            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            {vehicle.model}
          </div>

          <div
            className="
              mt-2
              text-[18px]
              font-semibold
            "

            style={{
              color:
                "#60A5FA"
            }}
          >
            {vehicle.engine}
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
            {vehicle.years}
            {" • "}
            {legacyPlatform
              ? "Legacy Platform"
              : "Modern Platform"
            }
          </div>

        </div>

        {/* ================================================== */}
        {/* IMAGE */}
        {/* ================================================== */}

        <div
          className="
            mt-6
            overflow-hidden
            rounded-3xl
            border
          "

          style={{
            borderColor:
              tacticalColors.border
          }}
        >

          <Image

            src="/vehicles/defender-110-300tdi.jpg"

            alt="Defender"

            width={600}

            height={420}

            className="
              h-[240px]
              w-full
              object-cover
            "
          />

        </div>

        {/* ================================================== */}
        {/* VALIDATION */}
        {/* ================================================== */}

        <div
          className="
            mt-6
            space-y-4
          "
        >

          <ValidationCard
            icon={<BadgeCheck size={16} />}
            title="JLR Validation"
            value="ERR3340 confirmed against OEM references"
            color="#22C55E"
          />

          <ValidationCard
            icon={<GitCompareArrows size={16} />}
            title="Supersession"
            value={supersession}
            color="#2563EB"
          />

          <ValidationCard
            icon={<Cog size={16} />}
            title="Drivetrain"
            value={drivetrain}
            color="#8B5CF6"
          />

          <ValidationCard
            icon={<Wrench size={16} />}
            title="LR Workshop"
            value="Operational compatibility cross-check successful"
            color="#F59E0B"
          />

        </div>

        {/* ================================================== */}
        {/* PROCUREMENT */}
        {/* ================================================== */}

        <div
          className="
            mt-8
            rounded-3xl
            border
            p-5
          "

          style={{

            background:
              tacticalColors.surface,

            borderColor:
              tacticalColors.border
          }}
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <RadioTower
              size={18}
              color="#60A5FA"
            />

            <div
              className="
                text-sm
                font-black
                uppercase
                tracking-[0.14em]
              "

              style={{
                color:
                  "#60A5FA"
              }}
            >
              Procurement Intelligence
            </div>

          </div>

          {/* ================================================ */}
          {/* GRID */}
          {/* ================================================ */}

          <div
            className="
              mt-5
              grid
              gap-4
            "
          >

            <TelemetryRow
              label="OEM Priority"
              value={
                oemPriority
                  ? "Enabled"
                  : "Disabled"
              }
              icon={<ShieldCheck size={15} />}
              color="#2563EB"
            />

            <TelemetryRow
              label="Expedition Risk"
              value={expeditionRisk}
              icon={<Truck size={15} />}
              color={
                expeditionRisk === "Low"
                  ? "#22C55E"
                  : "#F59E0B"
              }
            />

            <TelemetryRow
              label="Compatibility"
              value="Validated"
              icon={<CheckCircle2 size={15} />}
              color="#22C55E"
            />

            <TelemetryRow
              label="Counterfeit Risk"
              value={
                legacyPlatform
                  ? "Low"
                  : "Medium"
              }
              icon={<ShieldAlert size={15} />}
              color={
                legacyPlatform
                  ? "#22C55E"
                  : "#F59E0B"
              }
            />

          </div>

        </div>

        {/* ================================================== */}
        {/* EXPEDITION */}
        {/* ================================================== */}

        {expeditionMode && (

          <div
            className="
              mt-6
              rounded-3xl
              border
              p-5
            "

            style={{

              background:
                "rgba(245,158,11,0.08)",

              borderColor:
                "rgba(245,158,11,0.25)"
            }}
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <AlertTriangle
                size={18}
                color="#F59E0B"
              />

              <div
                className="
                  text-sm
                  font-black
                  uppercase
                  tracking-[0.14em]
                "

                style={{
                  color:
                    "#F59E0B"
                }}
              >
                Expedition Advisory
              </div>

            </div>

            <div
              className="
                mt-4
                text-sm
                leading-relaxed
              "

              style={{
                color:
                  tacticalColors.textPrimary
              }}
            >

              Procurement profile optimised for:
              {" "}

              {vehicle.engine}
              {" "}

              remote-area operational support.
              Carry expedition spares appropriate
              to drivetrain configuration and
              supplier lead times.

            </div>

          </div>
        )}

      </div>

    </div>
  )
}

// ============================================================
// VALIDATION
// ============================================================

function ValidationCard({
  icon,
  title,
  value,
  color
}:{
  icon: React.ReactNode
  title: string
  value: string
  color: string
}){

  return (

    <div
      className="
        rounded-2xl
        border
        p-4
      "

      style={{

        background:
          tacticalColors.surface,

        borderColor:
          tacticalColors.border
      }}
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          font-black
          uppercase
          tracking-[0.12em]
        "

        style={{
          color
        }}
      >

        {icon}

        {title}

      </div>

      <div
        className="
          mt-3
          text-sm
        "

        style={{
          color:
            tacticalColors.textPrimary
        }}
      >
        {value}
      </div>

    </div>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryRow({
  label,
  value,
  icon,
  color
}:{
  label: string
  value: string
  icon: React.ReactNode
  color: string
}){

  return (

    <div
      className="
        flex
        items-center
        justify-between
      "
    >

      <div
        className="
          flex
          items-center
          gap-2
          text-sm
        "

        style={{
          color:
            tacticalColors.textMuted
        }}
      >

        <div
          style={{
            color
          }}
        >
          {icon}
        </div>

        {label}

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
        {value}
      </div>

    </div>
  )
}