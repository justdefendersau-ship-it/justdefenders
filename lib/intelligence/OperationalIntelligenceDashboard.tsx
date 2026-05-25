/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\dashboard\OperationalIntelligenceDashboard.tsx
 *
 * Timestamp:
 * 23 May 2026 15:42 Sydney
 *
 * PURPOSE:
 * Operational Intelligence Dashboard
 *
 * STRATEGY:
 * PASS 35 — Operational Dashboard Consolidation
 *
 * OBJECTIVES:
 * - unified operational dashboard
 * - expedition telemetry visualization
 * - tactical procurement intelligence
 * - operational readiness presentation
 * - predictive maintenance surfacing
 * - consolidated vehicle intelligence
 *
 * ============================================================
 */

"use client"

import {

  Shield,
  Activity,
  Gauge,
  AlertTriangle,
  Truck,
  Wrench,
  Radar,
  Cpu,
  Globe,
  TimerReset

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

export default function OperationalIntelligenceDashboard(){

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
  // SUPPLIER INTELLIGENCE
  // ==========================================================

  const supplierProfiles =
buildSupplierReliabilityProfiles(

  results as any,

  procurementHistory
)

  // ==========================================================
  // PREDICTIVE
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
  // EMPTY
  // ==========================================================

  if (

    !profile

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

      <div
        className="
          grid
          gap-5
          xl:grid-cols-[1.35fr_420px]
        "
      >

        {/* ================================================== */}
        {/* LEFT */}
        {/* ================================================== */}

        <div
          className="
            space-y-5
          "
        >

          {/* =============================================== */}
          {/* TOP GRID */}
          {/* =============================================== */}

          <div
            className="
              grid
              gap-5
              md:grid-cols-2
              xl:grid-cols-4
            "
          >

            <MetricCard
              icon={
                <Shield className="h-5 w-5" />
              }
              label="Operational Readiness"
              value={`${readiness.readinessScore}%`}
              color="green"
              tooltip="
                Unified operational deployment readiness score.
              "
            />

            <MetricCard
              icon={
                <Radar className="h-5 w-5" />
              }
              label="Expedition Confidence"
              value={`${expedition.remoteDeploymentConfidence}%`}
              color="blue"
              tooltip="
                Remote expedition survivability confidence.
              "
            />

            <MetricCard
              icon={
                <Truck className="h-5 w-5" />
              }
              label="Procurement Resilience"
              value={`${readiness.procurementResilience}%`}
              color="amber"
              tooltip="
                Supplier federation operational resilience.
              "
            />

            <MetricCard
              icon={
                <Activity className="h-5 w-5" />
              }
              label="Federation Latency"
              value={`0ms`}
              color="cyan"
              tooltip="
                Current operational federation latency.
              "
            />

          </div>

          {/* =============================================== */}
          {/* DEPLOYMENT */}
          {/* =============================================== */}

          <DashboardPanel
            title="Operational Deployment Intelligence"
            subtitle="
              Tactical deployment readiness and expedition survivability analysis.
            "
          >

            <div
              className="
                grid
                gap-5
                lg:grid-cols-[1fr_260px]
              "
            >

              <div>

                <div
                  className="
                    text-[26px]
                    font-black
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  {readiness.deploymentStatus}
                </div>

                <div
                  className="
                    mt-3
                    max-w-[900px]
                    whitespace-pre-line
                    text-[14px]
                    leading-relaxed
                    text-slate-300
                  "
                >
                  {readiness.deploymentRecommendation}
                </div>

                <div
                  className="
                    mt-5
                    whitespace-pre-line
                    rounded-2xl
                    border
                    border-slate-800
                    bg-[#020817]
                    p-4
                    text-[13px]
                    leading-relaxed
                    text-slate-400
                  "
                >
                  {readiness.tacticalSummary}
                </div>

              </div>

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-800
                  bg-[#020817]
                  p-5
                "
              >

                <div
                  className="
                    text-[11px]
                    font-black
                    uppercase
                    tracking-[0.24em]
                    text-[#38BDF8]
                  "
                >
                  Operational Confidence
                </div>

                <div
                  className="
                    mt-3
                    text-[52px]
                    font-black
                    tracking-[-0.08em]
                    text-[#4ADE80]
                  "
                >
                  {readiness.operationalConfidence}
                </div>

                <div
                  className="
                    mt-2
                    text-[13px]
                    text-slate-400
                  "
                >
                  Tactical survivability confidence score.
                </div>

              </div>

            </div>

          </DashboardPanel>

          {/* =============================================== */}
          {/* ALERTS */}
          {/* =============================================== */}

          <DashboardPanel
            title="Predictive Maintenance Intelligence"
            subtitle="
              Operational failure escalation and survivability telemetry.
            "
          >

            <div
              className="
                space-y-4
              "
            >

              {

                failureCorrelation.signals.length === 0

                &&

                <div
                  className="
                    rounded-2xl
                    border
                    border-emerald-900
                    bg-emerald-950/30
                    p-5
                    text-[14px]
                    font-semibold
                    text-emerald-300
                  "
                >
                  No major operational escalation patterns detected.
                </div>
              }

              {

                failureCorrelation.signals.map(signal => (

                  <div
                    key={signal.id}
                    className="
                      rounded-2xl
                      border
                      border-slate-800
                      bg-[#020817]
                      p-5
                    "
                  >

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
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <AlertTriangle
                            className="
                              h-5
                              w-5
                              text-amber-400
                            "
                          />

                          <div
                            className="
                              text-[18px]
                              font-black
                              tracking-[-0.03em]
                              text-white
                            "
                          >
                            {signal.title}
                          </div>

                        </div>

                        <div
                          className="
                            mt-4
                            space-y-2
                          "
                        >

                          {

                            signal.evidence.map(item => (

                              <div
                                key={item}
                                className="
                                  text-[13px]
                                  text-slate-400
                                "
                              >
                                • {item}
                              </div>
                            ))
                          }

                        </div>

                      </div>

                      <div
                        className="
                          rounded-2xl
                          border
                          border-slate-800
                          bg-[#07101F]
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
                          Confidence
                        </div>

                        <div
                          className="
                            mt-2
                            text-[30px]
                            font-black
                            tracking-[-0.05em]
                            text-[#F59E0B]
                          "
                        >
                          {signal.confidence}%
                        </div>

                      </div>

                    </div>

                    <div
                      className="
                        mt-5
                        rounded-2xl
                        border
                        border-slate-800
                        bg-[#07101F]
                        p-4
                        text-[13px]
                        leading-relaxed
                        text-slate-300
                      "
                    >
                      {signal.recommendation}
                    </div>

                  </div>
                ))
              }

            </div>

          </DashboardPanel>

        </div>

        {/* ================================================== */}
        {/* RIGHT */}
        {/* ================================================== */}

        <div
          className="
            space-y-5
          "
        >

          {/* =============================================== */}
          {/* VEHICLE */}
          {/* =============================================== */}

          <DashboardPanel
            title="Operational Vehicle Profile"
            subtitle="
              VIN-linked expedition deployment intelligence.
            "
          >

            <div
              className="
                space-y-5
              "
            >

              <div>

                <div
                  className="
                    text-[34px]
                    font-black
                    tracking-[-0.05em]
                    text-white
                  "
                >
                  {profile.platform}
                </div>

                <div
                  className="
                    mt-2
                    text-[16px]
                    font-semibold
                    text-[#38BDF8]
                  "
                >
                  {profile.engine}
                </div>

                <div
                  className="
                    mt-1
                    text-[13px]
                    text-slate-500
                  "
                >
                  {profile.year}
                </div>

              </div>

              <InfoRow
                icon={
                  <Cpu className="h-4 w-4" />
                }
                label="Drivetrain"
                value={profile.drivetrain}
              />

              <InfoRow
                icon={
                  <Globe className="h-4 w-4" />
                }
                label="Expedition Score"
                value={`${profile.expeditionScore}`}
              />

              <InfoRow
                icon={
                  <Gauge className="h-4 w-4" />
                }
                label="Survivability"
                value={`${expedition.survivabilityIndex}%`}
              />

              <InfoRow
                icon={
                  <TimerReset className="h-4 w-4" />
                }
                label="Logistics Risk"
                value={`${expedition.logisticsRisk}%`}
              />

            </div>

          </DashboardPanel>

          {/* =============================================== */}
          {/* PACKS */}
          {/* =============================================== */}

          <DashboardPanel
            title="Expedition Deployment Packs"
            subtitle="
              Operational spare-kit recommendations for remote survivability.
            "
          >

            <div
              className="
                space-y-5
              "
            >

              {

                expedition.recommendedPacks.map(pack => (

                  <div
                    key={pack.title}
                    className="
                      rounded-2xl
                      border
                      border-slate-800
                      bg-[#020817]
                      p-5
                    "
                  >

                    <div
                      className="
                        text-[18px]
                        font-black
                        tracking-[-0.03em]
                        text-white
                      "
                    >
                      {pack.title}
                    </div>

                    <div
                      className="
                        mt-2
                        text-[13px]
                        leading-relaxed
                        text-slate-400
                      "
                    >
                      {pack.description}
                    </div>

                    <div
                      className="
                        mt-5
                        space-y-3
                      "
                    >

                      {

                        pack.items.map(item => (

                          <div
                            key={item.part}
                            className="
                              rounded-xl
                              border
                              border-slate-800
                              bg-[#07101F]
                              p-3
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                gap-3
                              "
                            >

                              <div
                                className="
                                  text-[13px]
                                  font-black
                                  text-white
                                "
                              >
                                {item.part}
                              </div>

                              <div
                                className="
                                  rounded-full
                                  bg-red-950/50
                                  px-3
                                  py-1
                                  text-[10px]
                                  font-black
                                  uppercase
                                  tracking-[0.16em]
                                  text-red-300
                                "
                              >
                                {item.priority}
                              </div>

                            </div>

                            <div
                              className="
                                mt-2
                                text-[12px]
                                text-slate-400
                              "
                            >
                              {item.rationale}
                            </div>

                          </div>
                        ))
                      }

                    </div>

                  </div>
                ))
              }

            </div>

          </DashboardPanel>

        </div>

      </div>

    </section>
  )
}

// ============================================================
// PANEL
// ============================================================

function DashboardPanel({

  title,
  subtitle,
  children

}: {

  title: string

  subtitle: string

  children: React.ReactNode

}){

  return (

    <section
      className="
        rounded-[30px]
        border
        border-slate-800
        bg-[#07101F]
        p-6
      "
    >

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
              text-[12px]
              font-black
              uppercase
              tracking-[0.24em]
              text-[#38BDF8]
            "
          >
            {title}
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
            {subtitle}
          </div>

        </div>

      </div>

      <div
        className="
          mt-6
        "
      >
        {children}
      </div>

    </section>
  )
}

// ============================================================
// METRIC
// ============================================================

function MetricCard({

  icon,
  label,
  value,
  color,
  tooltip

}: {

  icon: React.ReactNode

  label: string

  value: string

  color:
    "green"
    |
    "blue"
    |
    "amber"
    |
    "cyan"

  tooltip: string

}){

  const colors = {

    green:
      "text-[#4ADE80]",

    blue:
      "text-[#60A5FA]",

    amber:
      "text-[#F59E0B]",

    cyan:
      "text-[#22D3EE]"
  }

  return (

    <div
      title={tooltip}
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
          className="
            text-slate-400
          "
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

    </div>
  )
}

// ============================================================
// INFO ROW
// ============================================================

function InfoRow({

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
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        border-slate-800
        bg-[#020817]
        px-4
        py-3
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
            text-[13px]
            font-semibold
            text-slate-400
          "
        >
          {label}
        </div>

      </div>

      <div
        className="
          text-[13px]
          font-black
          text-white
        "
      >
        {value}
      </div>

    </div>
  )
}