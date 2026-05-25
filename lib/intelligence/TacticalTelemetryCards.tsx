/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\TacticalTelemetryCards.tsx
 *
 * Timestamp:
 * 23 May 2026 15:58 Sydney
 *
 * PURPOSE:
 * Tactical Telemetry Dashboard Cards
 *
 * STRATEGY:
 * PASS 35A — Tactical Telemetry Cards
 *
 * OBJECTIVES:
 * - live operational telemetry
 * - tactical federation visualization
 * - expedition deployment intelligence
 * - predictive maintenance surfacing
 * - operational readiness telemetry
 * - procurement resilience presentation
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Gauge,
  Globe,
  Radar,
  Shield,
  Truck,
  Wrench

} from "lucide-react"

import {

  useVehicleContext

} from "@/contexts/VehicleContext"

import {

  useFederationSearch

} from "@/contexts/FederationSearchContext"

import {

  useServiceIntelligence

} from "@/contexts/ServiceIntelligenceContext"

import {

  buildSupplierReliabilityProfiles

} from "@/lib/intelligence/supplierReliabilityEngine"

import {

  buildPredictiveMaintenanceAssessment

} from "@/lib/intelligence/predictiveMaintenanceEngine"

import {

  buildFailureCorrelationAssessment

} from "@/lib/intelligence/failurePatternCorrelationEngine"

import {

  buildOperationalReadinessAssessment

} from "@/lib/intelligence/operationalReadinessEngine"

import {

  buildExpeditionIntelligenceAssessment

} from "@/lib/intelligence/expeditionIntelligenceEngine"

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalTelemetryCards(){

  // ==========================================================
  // CONTEXT
  // ==========================================================

  const {

    profile

  } = useVehicleContext()

const {

  results

} = useFederationSearch()

  const {

    procurementHistory

  } = useServiceIntelligence()

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (

    !profile

  ){

    return null
  }

  // ==========================================================
  // SUPPLIERS
  // ==========================================================

  const supplierProfiles =
    buildSupplierReliabilityProfiles(

      results as any,

      procurementHistory
    )

  // ==========================================================
  // MAINTENANCE
  // ==========================================================

  const predictiveMaintenance =
    buildPredictiveMaintenanceAssessment(

      profile,

      procurementHistory
    )

  // ==========================================================
  // CORRELATION
  // ==========================================================

  const failureCorrelation =
    buildFailureCorrelationAssessment(

      profile,

      procurementHistory,

      supplierProfiles
    )

  // ==========================================================
  // READINESS
  // ==========================================================

  const readiness =
    buildOperationalReadinessAssessment(

      profile,

      predictiveMaintenance,

      failureCorrelation,

      supplierProfiles
    )

  // ==========================================================
  // EXPEDITION
  // ==========================================================

  const expedition =
    buildExpeditionIntelligenceAssessment(

      profile,

      readiness,

      failureCorrelation,

      supplierProfiles
    )

  // ==========================================================
  // HEALTH
  // ==========================================================

  const healthySuppliers =
    supplierProfiles.filter(

      supplier =>

        supplier.federationHealthScore >= 80
    ).length

  // ==========================================================
  // ALERTS
  // ==========================================================

  const activeAlerts =
    failureCorrelation.signals.length

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <section
      className="
        mt-6
      "
    >

      <div
        className="
          grid
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* ================================================== */}
        {/* FEDERATION */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <Activity className="h-5 w-5" />
          }
          title="Federation Health"
          value={
            true
            ?
            "ACTIVE"
            :
            "OFFLINE"
          }
          metric={`${healthySuppliers} Healthy`}
          accent="cyan"
          tooltip="
            Live operational procurement federation health state.
          "
        >

          <ProgressBar
            value={
              healthySuppliers * 20
            }
            color="cyan"
          />

          <TelemetryRow
            label="Latency"
            value={`${0 || 0}ms`}
          />

          <TelemetryRow
            label="Suppliers"
            value={`${supplierProfiles.length}`}
          />

        </TelemetryCard>

        {/* ================================================== */}
        {/* EXPEDITION */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <Globe className="h-5 w-5" />
          }
          title="Expedition Readiness"
          value={`${expedition.expeditionScore}%`}
          metric={
            readiness.deploymentStatus
          }
          accent="green"
          tooltip="
            Remote deployment survivability confidence.
          "
        >

          <ProgressBar
            value={
              expedition.remoteDeploymentConfidence
            }
            color="green"
          />

          <TelemetryRow
            label="Survivability"
            value={`${expedition.survivabilityIndex}%`}
          />

          <TelemetryRow
            label="Logistics Risk"
            value={`${expedition.logisticsRisk}%`}
          />

        </TelemetryCard>

        {/* ================================================== */}
        {/* MAINTENANCE */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <Wrench className="h-5 w-5" />
          }
          title="Predictive Maintenance"
          value={`${activeAlerts}`}
          metric="Active Signals"
          accent="amber"
          tooltip="
            Operational maintenance escalation telemetry.
          "
        >

          <ProgressBar
            value={
              predictiveMaintenance
                .maintenanceRiskScore
            }
            color="amber"
          />

          <TelemetryRow
            label="Risk Score"
            value={
              `${predictiveMaintenance.maintenanceRiskScore}%`
            }
          />

          <TelemetryRow
            label="Confidence"
            value={
              `${predictiveMaintenance.operationalConfidence}%`
            }
          />

        </TelemetryCard>

        {/* ================================================== */}
        {/* PROCUREMENT */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <Truck className="h-5 w-5" />
          }
          title="Procurement Resilience"
          value={`${readiness.procurementResilience}%`}
          metric="Operational"
          accent="blue"
          tooltip="
            Tactical procurement survivability analysis.
          "
        >

          <ProgressBar
            value={
              readiness.procurementResilience
            }
            color="blue"
          />

          <TelemetryRow
            label="Coverage"
            value={`${results.length}`}
          />

          <TelemetryRow
            label="History"
            value={`${procurementHistory.length}`}
          />

        </TelemetryCard>

        {/* ================================================== */}
        {/* VEHICLE */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <Cpu className="h-5 w-5" />
          }
          title="Vehicle Intelligence"
          value={profile.engine}
          metric={`${profile.year}`}
          accent="purple"
          tooltip="
            Operational vehicle profile telemetry.
          "
        >

          <ProgressBar
            value={
              profile.expeditionScore
            }
            color="purple"
          />

          <TelemetryRow
            label="Platform"
            value={profile.platform}
          />

          <TelemetryRow
            label="Drivetrain"
            value={profile.drivetrain}
          />

        </TelemetryCard>

        {/* ================================================== */}
        {/* READINESS */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <Shield className="h-5 w-5" />
          }
          title="Operational Readiness"
          value={`${readiness.readinessScore}%`}
          metric={
            readiness.deploymentStatus
          }
          accent="green"
          tooltip="
            Unified tactical deployment readiness score.
          "
        >

          <ProgressBar
            value={
              readiness.operationalConfidence
            }
            color="green"
          />

          <TelemetryRow
            label="Confidence"
            value={`${readiness.operationalConfidence}%`}
          />

          <TelemetryRow
            label="Survivability"
            value={`${readiness.survivabilityScore}%`}
          />

        </TelemetryCard>

        {/* ================================================== */}
        {/* ESCALATION */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <AlertTriangle className="h-5 w-5" />
          }
          title="Failure Escalation"
          value={
            `${failureCorrelation.overallEscalationRisk}%`
          }
          metric="Operational"
          accent="red"
          tooltip="
            Escalating operational degradation analysis.
          "
        >

          <ProgressBar
            value={
              failureCorrelation.overallEscalationRisk
            }
            color="red"
          />

          <TelemetryRow
            label="Expedition"
            value={
              `${failureCorrelation.expeditionFailureProbability}%`
            }
          />

          <TelemetryRow
            label="Signals"
            value={`${activeAlerts}`}
          />

        </TelemetryCard>

        {/* ================================================== */}
        {/* DEPLOYMENT */}
        {/* ================================================== */}

        <TelemetryCard
          icon={
            <Radar className="h-5 w-5" />
          }
          title="Deployment Confidence"
          value={
            `${expedition.remoteDeploymentConfidence}%`
          }
          metric="Remote Ops"
          accent="cyan"
          tooltip="
            Remote operational deployment confidence telemetry.
          "
        >

          <ProgressBar
            value={
              expedition.remoteDeploymentConfidence
            }
            color="cyan"
          />

          <TelemetryRow
            label="Readiness"
            value={`${expedition.expeditionScore}%`}
          />

          <TelemetryRow
            label="Warnings"
            value={`${expedition.criticalWarnings.length}`}
          />

        </TelemetryCard>

      </div>

    </section>
  )
}

// ============================================================
// CARD
// ============================================================

function TelemetryCard({

  icon,
  title,
  value,
  metric,
  accent,
  tooltip,
  children

}: {

  icon: React.ReactNode

  title: string

  value: string

  metric: string

  accent:
    "green"
    |
    "blue"
    |
    "amber"
    |
    "cyan"
    |
    "purple"
    |
    "red"

  tooltip: string

  children: React.ReactNode

}){

  const accents = {

    green:
      "text-[#4ADE80]",

    blue:
      "text-[#60A5FA]",

    amber:
      "text-[#F59E0B]",

    cyan:
      "text-[#22D3EE]",

    purple:
      "text-[#A78BFA]",

    red:
      "text-[#F87171]"
  }

  return (

    <div
      title={tooltip}
      className="
        rounded-[30px]
        border
        border-slate-800
        bg-[#07101F]
        p-5
        transition-all
        hover:border-slate-700
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
          className={accents[accent]}
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
          {title}
        </div>

      </div>

      <div
        className={`
          mt-5
          text-[34px]
          font-black
          tracking-[-0.06em]

          ${accents[accent]}
        `}
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-[12px]
          font-semibold
          text-slate-500
        "
      >
        {metric}
      </div>

      <div
        className="
          mt-5
          space-y-3
        "
      >
        {children}
      </div>

    </div>
  )
}

// ============================================================
// PROGRESS
// ============================================================

function ProgressBar({

  value,
  color

}: {

  value: number

  color:
    "green"
    |
    "blue"
    |
    "amber"
    |
    "cyan"
    |
    "purple"
    |
    "red"

}){

  const colors = {

    green:
      "bg-[#4ADE80]",

    blue:
      "bg-[#60A5FA]",

    amber:
      "bg-[#F59E0B]",

    cyan:
      "bg-[#22D3EE]",

    purple:
      "bg-[#A78BFA]",

    red:
      "bg-[#F87171]"
  }

  return (

    <div
      className="
        h-2
        overflow-hidden
        rounded-full
        bg-[#020817]
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
          width: `${Math.min(value, 100)}%`
        }}
      />

    </div>
  )
}

// ============================================================
// ROW
// ============================================================

function TelemetryRow({

  label,
  value

}: {

  label: string

  value: string

}){

  return (

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
          text-[12px]
          text-slate-500
        "
      >
        {label}
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
  )
}