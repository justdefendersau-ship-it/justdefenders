/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\TacticalFederationVisualization.tsx
 *
 * Timestamp:
 * 23 May 2026 16:24 Sydney
 *
 * PURPOSE:
 * Tactical Federation Visualization Layer
 *
 * STRATEGY:
 * PASS 35B — Tactical Federation Visualization
 *
 * OBJECTIVES:
 * - live federation telemetry
 * - tactical supplier visualization
 * - operational procurement awareness
 * - federation latency intelligence
 * - supplier health surfacing
 * - command-centre federation experience
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Cpu,
  Globe,
  Radar,
  ShieldAlert,
  Truck,
  WifiOff

} from "lucide-react"

import {

  useFederationSearch

} from "@/contexts/FederationSearchContext"

import {

  useServiceIntelligence

} from "@/contexts/ServiceIntelligenceContext"

import {

  buildSupplierReliabilityProfiles

} from "@/lib/intelligence/supplierReliabilityEngine"

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalFederationVisualization(){

  // ==========================================================
  // CONTEXT
  // ==========================================================

  const {

    results,
    
    
  } = useFederationSearch()

  const {

    procurementHistory

  } = useServiceIntelligence()

  // ==========================================================
  // SUPPLIER INTELLIGENCE
  // ==========================================================

  const supplierProfiles =
buildSupplierReliabilityProfiles(

  results as any,

  procurementHistory
)

  // ==========================================================
  // HEALTH COUNTS
  // ==========================================================

  const healthyCount =
    supplierProfiles.filter(

      supplier =>

        supplier.federationHealthScore >= 80
    ).length

  const degradedCount =
    supplierProfiles.filter(

      supplier =>

        supplier.federationHealthScore >= 55
        &&
        supplier.federationHealthScore < 80
    ).length

  const failedCount =
    supplierProfiles.filter(

      supplier =>

        supplier.federationHealthScore < 55
    ).length

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    supplierProfiles.length === 0

  ){

    return null
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      className="
        mt-6
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              text-[12px]
              font-black
              uppercase
              tracking-[0.24em]
              text-[#38BDF8]
            "
          >
            Tactical Federation Visualization
          </div>

          <div
            className="
              mt-3
              max-w-[900px]
              text-[14px]
              leading-relaxed
              text-slate-400
            "
          >
            Live operational procurement federation telemetry and tactical supplier intelligence.
          </div>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <FederationStatusBadge
icon={
  true
  ?
              <Activity className="h-4 w-4" />
              :
              <WifiOff className="h-4 w-4" />
            }
            label={
              true
              ?
              "FEDERATION ACTIVE"
              :
              "FEDERATION OFFLINE"
            }
            color={
              true
              ?
              "green"
              :
              "red"
            }
          />

          <FederationStatusBadge
            icon={
              <Clock3 className="h-4 w-4" />
            }
            label="0ms"
            color="cyan"
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* HEALTH GRID */}
      {/* ==================================================== */}

      <div
        className="
          mt-6
          grid
          gap-5
          md:grid-cols-3
        "
      >

        <HealthCard
          icon={
            <CheckCircle2 className="h-5 w-5" />
          }
          label="Healthy Suppliers"
          value={`${healthyCount}`}
          color="green"
          description="
            Operational suppliers with strong federation stability.
          "
        />

        <HealthCard
          icon={
            <AlertTriangle className="h-5 w-5" />
          }
          label="Degraded Suppliers"
          value={`${degradedCount}`}
          color="amber"
          description="
            Federation nodes showing operational latency or resilience degradation.
          "
        />

        <HealthCard
          icon={
            <ShieldAlert className="h-5 w-5" />
          }
          label="Failed Suppliers"
          value={`${failedCount}`}
          color="red"
          description="
            Suppliers with critical operational federation issues.
          "
        />

      </div>

      {/* ==================================================== */}
      {/* SUPPLIER GRID */}
      {/* ==================================================== */}

      <div
        className="
          mt-6
          grid
          gap-5
          xl:grid-cols-2
        "
      >

        {

          supplierProfiles.map(

            supplier => (

              <SupplierTelemetryCard
                key={supplier.supplier}
                supplier={supplier}
              />
            )
          )
        }

      </div>

    </section>
  )
}

// ============================================================
// SUPPLIER CARD
// ============================================================

function SupplierTelemetryCard({

  supplier

}: {

  supplier: ReturnType<
    typeof buildSupplierReliabilityProfiles
  >[number]

}){

  // ==========================================================
  // HEALTH
  // ==========================================================

  const healthState =
    supplier.federationHealthScore >= 80

    ?

    "HEALTHY"

    :

    supplier.federationHealthScore >= 55

    ?

    "DEGRADED"

    :

    "FAILED"

  // ==========================================================
  // HEALTH COLOR
  // ==========================================================

  const healthColor = {

    HEALTHY:
      "text-[#4ADE80]",

    DEGRADED:
      "text-[#F59E0B]",

    FAILED:
      "text-[#F87171]"
  }

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
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              text-[24px]
              font-black
              tracking-[-0.05em]
              text-white
            "
          >
            {supplier.supplier}
          </div>

          <div
            className={`
              mt-2
              text-[12px]
              font-black
              uppercase
              tracking-[0.18em]

              ${healthColor[healthState]}
            `}
          >
            {healthState}
          </div>

        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-800
            bg-[#020817]
            px-5
            py-4
            text-right
          "
        >

          <div
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.18em]
              text-slate-500
            "
          >
            Tactical Rank
          </div>

          <div
            className="
              mt-2
              text-[34px]
              font-black
              tracking-[-0.06em]
              text-[#38BDF8]
            "
          >
            {supplier.tacticalRank}
          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* TELEMETRY */}
      {/* ==================================================== */}

      <div
        className="
          mt-6
          grid
          gap-4
          md:grid-cols-2
        "
      >

        <TelemetryMetric
          icon={
            <Radar className="h-4 w-4" />
          }
          label="Reliability"
          value={`${supplier.reliabilityScore}%`}
          progress={supplier.reliabilityScore}
          color="green"
        />

        <TelemetryMetric
          icon={
            <Cpu className="h-4 w-4" />
          }
          label="Operational Confidence"
          value={`${supplier.operationalConfidence}%`}
          progress={supplier.operationalConfidence}
          color="blue"
        />

        <TelemetryMetric
          icon={
            <Truck className="h-4 w-4" />
          }
          label="Expedition Suitability"
          value={`${supplier.expeditionSuitability}%`}
          progress={supplier.expeditionSuitability}
          color="amber"
        />

        <TelemetryMetric
          icon={
            <Clock3 className="h-4 w-4" />
          }
          label="Latency"
          value={`${supplier.averageLatency}ms`}
          progress={
            Math.max(
              5,
              100 - supplier.averageLatency / 10
            )
          }
          color="cyan"
        />

      </div>

      {/* ==================================================== */}
      {/* FOOTER */}
      {/* ==================================================== */}

      <div
        className="
          mt-6
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
          rounded-2xl
          border
          border-slate-800
          bg-[#020817]
          px-5
          py-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Globe
            className="
              h-4
              w-4
              text-[#38BDF8]
            "
          />

          <div
            className="
              text-[12px]
              text-slate-400
            "
          >
            Procurement Frequency
          </div>

        </div>

        <div
          className="
            text-[13px]
            font-black
            text-white
          "
        >
          {supplier.procurementFrequency}
        </div>

      </div>

    </div>
  )
}

// ============================================================
// HEALTH CARD
// ============================================================

function HealthCard({

  icon,
  label,
  value,
  color,
  description

}: {

  icon: React.ReactNode

  label: string

  value: string

  color:
    "green"
    |
    "amber"
    |
    "red"

  description: string

}){

  const colors = {

    green:
      "text-[#4ADE80]",

    amber:
      "text-[#F59E0B]",

    red:
      "text-[#F87171]"
  }

  return (

    <div
      className="
        rounded-[28px]
        border
        border-slate-800
        bg-[#07101F]
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
          className={colors[color]}
        >
          {icon}
        </div>

        <div
          className="
            text-[11px]
            font-black
            uppercase
            tracking-[0.18em]
            text-slate-500
          "
        >
          {label}
        </div>

      </div>

      <div
        className={`
          mt-5
          text-[42px]
          font-black
          tracking-[-0.08em]

          ${colors[color]}
        `}
      >
        {value}
      </div>

      <div
        className="
          mt-3
          text-[13px]
          leading-relaxed
          text-slate-400
        "
      >
        {description}
      </div>

    </div>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryMetric({

  icon,
  label,
  value,
  progress,
  color

}: {

  icon: React.ReactNode

  label: string

  value: string

  progress: number

  color:
    "green"
    |
    "blue"
    |
    "amber"
    |
    "cyan"

}){

  const colors = {

    green:
      "bg-[#4ADE80]",

    blue:
      "bg-[#60A5FA]",

    amber:
      "bg-[#F59E0B]",

    cyan:
      "bg-[#22D3EE]"
  }

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-[#020817]
        p-4
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
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              text-[#38BDF8]
            "
          >
            {icon}
          </div>

          <div
            className="
              text-[12px]
              font-semibold
              text-slate-400
            "
          >
            {label}
          </div>

        </div>

        <div
          className="
            text-[12px]
            font-black
            text-white
          "
        >
          {value}
        </div>

      </div>

      <div
        className="
          mt-4
          h-2
          overflow-hidden
          rounded-full
          bg-slate-900
        "
      >

        <div
          className={`
            h-full
            rounded-full
            transition-all

            ${colors[color]}
          `}
          style={{
            width: `${Math.min(progress, 100)}%`
          }}
        />

      </div>

    </div>
  )
}

// ============================================================
// STATUS BADGE
// ============================================================

function FederationStatusBadge({

  icon,
  label,
  color

}: {

  icon: React.ReactNode

  label: string

  color:
    "green"
    |
    "cyan"
    |
    "red"

}){

  const colors = {

    green:
      "border-emerald-900 bg-emerald-950/40 text-emerald-300",

    cyan:
      "border-cyan-900 bg-cyan-950/40 text-cyan-300",

    red:
      "border-red-900 bg-red-950/40 text-red-300"
  }

  return (

    <div
      className={`
        flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2
        text-[11px]
        font-black
        uppercase
        tracking-[0.16em]

        ${colors[color]}
      `}
    >

      {icon}

      {label}

    </div>
  )
}