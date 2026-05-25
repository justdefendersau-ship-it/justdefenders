/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\VehicleIntelligenceNerveCentre.tsx
 *
 * Timestamp:
 * 24 May 2026 02:12 Sydney
 *
 * PURPOSE:
 * Vehicle Intelligence Nerve Centre
 *
 * STRATEGY:
 * PASS 46A.3 — Vehicle Intelligence Nerve Centre
 *
 * OBJECTIVES:
 * - operational vehicle intelligence
 * - expedition survivability telemetry
 * - predictive maintenance advisories
 * - tactical readiness scoring
 * - procurement confidence intelligence
 * - federation telemetry visibility
 * - operational alert orchestration
 * - compact tactical intelligence density
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Fuel,
  Globe,
  Shield,
  Truck,
  Wrench

} from "lucide-react"

import OperationalTooltip from "@/components/tooltips/OperationalTooltip"

// ============================================================
// TYPES
// ============================================================

interface VehicleIntelligenceNerveCentreProps {

  vin?: string

  vehicle?: string

  engine?: string

  year?: string

  readiness?: number

  survivability?: number

  expedition?: number

  federationHealth?:
    "HEALTHY"
    |
    "DEGRADED"
    |
    "OFFLINE"

  fitmentConfidence?: number

  operationalAlerts?: number
}

// ============================================================
// COMPONENT
// ============================================================

export default function VehicleIntelligenceNerveCentre({

  vin = "SALLDHM88XA123456",

  vehicle = "Defender 110",

  engine = "Td5",

  year = "1999",

  readiness = 92,

  survivability = 88,

  expedition = 94,

  federationHealth = "HEALTHY",

  fitmentConfidence = 97,

  operationalAlerts = 2

}: VehicleIntelligenceNerveCentreProps){

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        space-y-6
      "
    >

      {/* ==================================================== */}
      {/* CORE VEHICLE */}
      {/* ==================================================== */}

      <div
        className="
          overflow-hidden
          rounded-[34px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div
          className="
            border-b
            border-slate-800
            bg-[#020817]
            px-6
            py-5
          "
        >

          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.26em]
              text-[#38BDF8]
            "
          >
            Operational Vehicle Intelligence
          </div>

          <div
            className="
              mt-3
              text-[34px]
              font-black
              tracking-[-0.06em]
              text-white
            "
          >
            {engine} {vehicle} {year}
          </div>

          <div
            className="
              mt-3
              text-[11px]
              uppercase
              tracking-[0.16em]
              text-slate-500
            "
          >
            {vin}
          </div>

        </div>

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div
          className="
            p-6
          "
        >

          {/* =============================================== */}
          {/* READINESS */}
          {/* =============================================== */}

          <div
            className="
              grid
              gap-4

              sm:grid-cols-3
            "
          >

            <OperationalScoreCard

              label="Readiness"

              value={readiness}

              icon={
                <Shield className="h-5 w-5" />
              }

              color="cyan"

              tooltipTitle="Operational Readiness"

              tooltipDescription="
                Tactical operational readiness score
                based on telemetry stability,
                maintenance exposure,
                survivability weighting,
                and procurement confidence.
              "

              tooltipGuidance="
                Vehicles above 85 are considered
                expedition deployable.
              "
            />

            <OperationalScoreCard

              label="Survivability"

              value={survivability}

              icon={
                <Globe className="h-5 w-5" />
              }

              color="green"

              tooltipTitle="Expedition Survivability"

              tooltipDescription="
                Expedition survivability score
                estimating remote-operational resilience
                under sustained deployment conditions.
              "

              tooltipGuidance="
                Td5 survivability improves significantly
                with proactive cooling and driveline maintenance.
              "
            />

            <OperationalScoreCard

              label="Expedition"

              value={expedition}

              icon={
                <Truck className="h-5 w-5" />
              }

              color="amber"

              tooltipTitle="Expedition Deployment"

              tooltipDescription="
                Tactical expedition deployment capability
                derived from maintenance telemetry,
                procurement support,
                and operational resilience factors.
              "

              tooltipGuidance="
                Expedition score currently within
                high-confidence deployment threshold.
              "
            />

          </div>

          {/* =============================================== */}
          {/* FITMENT */}
          {/* =============================================== */}

          <div
            className="
              mt-6
              rounded-[28px]
              border
              border-slate-800
              bg-[#020817]
              p-6
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

              <div>

                <div
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.22em]
                    text-[#38BDF8]
                  "
                >
                  Procurement Confidence
                </div>

                <div
                  className="
                    mt-3
                    text-[28px]
                    font-black
                    tracking-[-0.06em]
                    text-white
                  "
                >
                  {fitmentConfidence}% Fitment Match
                </div>

              </div>

              <OperationalTooltip

                title="OEM Fitment Intelligence"

                description="
                  Federation procurement intelligence
                  indicates strong fitment compatibility
                  across operational supplier telemetry.
                "

                guidance="
                  Expedition-grade procurement confidence
                  currently exceeds safe deployment threshold.
                "

                category="federation"

                severity="success"

              >

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-emerald-800
                    bg-emerald-950/20
                    text-emerald-300
                  "
                >

                  <CheckCircle2 className="h-7 w-7" />

                </div>

              </OperationalTooltip>

            </div>

            {/* =========================================== */}
            {/* BADGES */}
            {/* =========================================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <IntelligenceBadge
                label="OEM Compatible"
                type="success"
              />

              <IntelligenceBadge
                label="Expedition Ready"
                type="warning"
              />

              <IntelligenceBadge
                label="Verified Federation"
                type="info"
              />

              <IntelligenceBadge
                label="Operational Stock"
                type="success"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* TELEMETRY */}
      {/* ==================================================== */}

      <div
        className="
          overflow-hidden
          rounded-[34px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div
          className="
            border-b
            border-slate-800
            bg-[#020817]
            px-6
            py-5
          "
        >

          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.24em]
              text-[#38BDF8]
            "
          >
            Tactical Federation Telemetry
          </div>

          <div
            className="
              mt-3
              text-[26px]
              font-black
              tracking-[-0.05em]
              text-white
            "
          >
            Operational Federation Status
          </div>

        </div>

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div
          className="
            p-6
          "
        >

          <div
            className="
              grid
              gap-4

              sm:grid-cols-2
            "
          >

            <TelemetryNode

              label="Federation"

              value={federationHealth}

              icon={
                <Activity className="h-4 w-4" />
              }

              status={
                federationHealth === "HEALTHY"

                ?

                "success"

                :

                federationHealth === "DEGRADED"

                ?

                "warning"

                :

                "critical"
              }
            />

            <TelemetryNode

              label="Supplier Latency"

              value="69ms"

              icon={
                <Clock3 className="h-4 w-4" />
              }

              status="info"
            />

            <TelemetryNode

              label="Operational Alerts"

              value={String(operationalAlerts)}

              icon={
                <AlertTriangle className="h-4 w-4" />
              }

              status="warning"
            />

            <TelemetryNode

              label="Procurement Status"

              value="ACTIVE"

              icon={
                <Wrench className="h-4 w-4" />
              }

              status="success"
            />

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* EXPEDITION */}
      {/* ==================================================== */}

      <div
        className="
          overflow-hidden
          rounded-[34px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div
          className="
            border-b
            border-slate-800
            bg-[#020817]
            px-6
            py-5
          "
        >

          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.24em]
              text-[#38BDF8]
            "
          >
            Expedition Intelligence
          </div>

          <div
            className="
              mt-3
              text-[26px]
              font-black
              tracking-[-0.05em]
              text-white
            "
          >
            Tactical Deployment Advisory
          </div>

        </div>

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <div
          className="
            p-6
            space-y-5
          "
        >

          <AdvisoryCard

            title="Cooling System Monitoring"

            description="
              Td5 thermal survivability remains stable,
              however remote expedition deployments should
              include coolant hose redundancy and spare clamps.
            "

            severity="warning"

            icon={
              <Fuel className="h-5 w-5" />
            }
          />

          <AdvisoryCard

            title="Driveline Confidence"

            description="
              Operational telemetry indicates stable driveline
              survivability across current procurement
              and maintenance intelligence.
            "

            severity="success"

            icon={
              <Shield className="h-5 w-5" />
            }
          />

          <AdvisoryCard

            title="Remote Deployment"

            description="
              Expedition readiness currently within tactical
              deployment threshold for extended regional operation.
            "

            severity="info"

            icon={
              <Truck className="h-5 w-5" />
            }
          />

        </div>

      </div>

    </div>
  )
}

// ============================================================
// SCORE
// ============================================================

function OperationalScoreCard({

  label,
  value,
  icon,
  color,
  tooltipTitle,
  tooltipDescription,
  tooltipGuidance

}: {

  label: string

  value: number

  icon: React.ReactNode

  color:
    "cyan"
    |
    "green"
    |
    "amber"

  tooltipTitle: string

  tooltipDescription: string

  tooltipGuidance: string

}){

  return (

    <OperationalTooltip

      title={tooltipTitle}

      description={tooltipDescription}

      guidance={tooltipGuidance}

      severity="info"

    >

      <div
        className="
          rounded-[24px]
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
            className={`

              ${

                color === "green"

                ?

                "text-[#4ADE80]"

                :

                color === "amber"

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
              text-[34px]
              font-black
              tracking-[-0.06em]
              text-white
            "
          >
            {value}
          </div>

        </div>

        <div
          className="
            mt-4
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-slate-500
          "
        >
          {label}
        </div>

      </div>

    </OperationalTooltip>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryNode({

  label,
  value,
  icon,
  status

}: {

  label: string

  value: string

  icon: React.ReactNode

  status:
    "success"
    |
    "warning"
    |
    "critical"
    |
    "info"

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

              status === "critical"

              ?

              "text-red-400"

              :

              "text-[#38BDF8]"
            }
          `}
        >
          {icon}
        </div>

        <div
          className="
            text-[22px]
            font-black
            tracking-[-0.05em]
            text-white
          "
        >
          {value}
        </div>

      </div>

      <div
        className="
          mt-4
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-slate-500
        "
      >
        {label}
      </div>

    </div>
  )
}

// ============================================================
// BADGE
// ============================================================

function IntelligenceBadge({

  label,
  type

}: {

  label: string

  type:
    "success"
    |
    "warning"
    |
    "info"

}){

  return (

    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-3
        text-[10px]
        font-black
        uppercase
        tracking-[0.18em]

        ${

          type === "success"

          ?

          `
          border-emerald-800
          bg-emerald-950/20
          text-emerald-300
          `

          :

          type === "warning"

          ?

          `
          border-amber-800
          bg-amber-950/20
          text-amber-300
          `

          :

          `
          border-cyan-800
          bg-cyan-950/20
          text-cyan-300
          `
        }
      `}
    >
      {label}
    </div>
  )
}

// ============================================================
// ADVISORY
// ============================================================

function AdvisoryCard({

  title,
  description,
  icon,
  severity

}: {

  title: string

  description: string

  icon: React.ReactNode

  severity:
    "success"
    |
    "warning"
    |
    "info"

}){

  return (

    <div
      className="
        rounded-[24px]
        border
        border-slate-800
        bg-[#020817]
        p-5
      "
    >

      <div
        className="
          flex
          items-start
          gap-5
        "
      >

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border

            ${

              severity === "success"

              ?

              `
              border-emerald-800
              bg-emerald-950/20
              text-emerald-300
              `

              :

              severity === "warning"

              ?

              `
              border-amber-800
              bg-amber-950/20
              text-amber-300
              `

              :

              `
              border-cyan-800
              bg-cyan-950/20
              text-cyan-300
              `
            }
          `}
        >
          {icon}
        </div>

        <div>

          <div
            className="
              text-[15px]
              font-black
              text-white
            "
          >
            {title}
          </div>

          <div
            className="
              mt-3
              text-[13px]
              leading-relaxed
              text-slate-500
            "
          >
            {description}
          </div>

        </div>

      </div>

    </div>
  )
}