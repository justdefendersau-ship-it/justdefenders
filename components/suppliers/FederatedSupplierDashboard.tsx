/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\suppliers\FederatedSupplierDashboard.tsx
 *
 * Timestamp:
 * 23 May 2026 23:38 Sydney
 *
 * PURPOSE:
 * Tactical Federated Supplier Dashboard
 *
 * STRATEGY:
 * PASS 44B — Federation Supplier Consolidation Layer
 *
 * OBJECTIVES:
 * - unified supplier federation visualization
 * - tactical operational supplier telemetry
 * - federation health intelligence
 * - consolidated supplier scoring
 * - operational supplier readiness UX
 * - responsive command-centre supplier dashboard
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  AlertTriangle,
  ArrowUpRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  Globe,
  Shield,
  Truck

} from "lucide-react"

import {

  consolidateFederationSuppliers

} from "@/lib/procurement/federationSupplierConsolidation"

import type {

  TacticalSupplier

} from "@/lib/procurement/buildSupplierTable"

import type {

  FederationEvent

} from "@/lib/federation/federationEngine"

// ============================================================
// TYPES
// ============================================================

interface FederatedSupplierDashboardProps {

  suppliers:
    TacticalSupplier[]

  federationEvents:
    FederationEvent[]
}

// ============================================================
// COMPONENT
// ============================================================

export default function FederatedSupplierDashboard({

  suppliers,
  federationEvents

}: FederatedSupplierDashboardProps){

  // ==========================================================
  // CONSOLIDATION
  // ==========================================================

  const consolidated =
    consolidateFederationSuppliers(

      suppliers,

      federationEvents
    )

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        space-y-8
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          flex
          flex-col
          gap-6

          xl:flex-row
          xl:items-center
          xl:justify-between
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
            Federation Consolidation
          </div>

          <div
            className="
              mt-3
              text-[40px]
              font-black
              tracking-[-0.07em]
              text-white
            "
          >
            Supplier Federation Command
          </div>

          <div
            className="
              mt-4
              max-w-[920px]
              text-[15px]
              leading-relaxed
              text-slate-400
            "
          >
            Unified operational supplier telemetry,
            procurement federation scoring,
            expedition procurement readiness,
            and tactical supplier intelligence.
          </div>

        </div>

        {/* =============================================== */}
        {/* STATUS */}
        {/* =============================================== */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-4
          "
        >

          <FederationStatusCard
            label="Federation"
            value="LIVE"
            icon={
              <Globe className="h-4 w-4" />
            }
            status="success"
          />

          <FederationStatusCard
            label="Suppliers"
            value={String(consolidated.length)}
            icon={
              <Truck className="h-4 w-4" />
            }
            status="info"
          />

          <FederationStatusCard
            label="Telemetry"
            value="ACTIVE"
            icon={
              <Activity className="h-4 w-4" />
            }
            status="success"
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* TABLE */}
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
        {/* HEAD */}
        {/* ================================================== */}

        <div
          className="
            grid
            grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]
            border-b
            border-slate-800
            bg-[#020817]
            px-8
            py-5
          "
        >

          {

            [

              "Supplier",
              "Telemetry",
              "Latency",
              "Procurement",
              "Reliability",
              "Status"

            ].map(item => (

              <div
                key={item}
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-slate-500
                "
              >
                {item}
              </div>
            ))
          }

        </div>

        {/* ================================================== */}
        {/* ROWS */}
        {/* ================================================== */}

        {

          consolidated.map(supplier => (

            <div
              key={supplier.supplierName}
              className="
                grid
                grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]
                items-center
                border-b
                border-slate-900
                px-8
                py-6
                transition-all
                hover:bg-[#020817]
              "
            >

              {/* =========================================== */}
              {/* SUPPLIER */}
              {/* =========================================== */}

              <div>

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
                      bg-[#020817]
                      text-[#38BDF8]
                    "
                  >

                    <Truck className="h-5 w-5" />

                  </div>

                  <div>

                    <div
                      className="
                        text-[15px]
                        font-black
                        text-white
                      "
                    >
                      {supplier.supplierName}
                    </div>

                    <div
                      className="
                        mt-2
                        text-[12px]
                        text-slate-500
                      "
                    >
                      {supplier.location}
                    </div>

                  </div>

                </div>

              </div>

              {/* =========================================== */}
              {/* TELEMETRY */}
              {/* =========================================== */}

              <div
                className="
                  text-[18px]
                  font-black
                  tracking-[-0.05em]
                  text-[#38BDF8]
                "
              >
                {supplier.telemetryScore}
              </div>

              {/* =========================================== */}
              {/* LATENCY */}
              {/* =========================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Clock3
                  className="
                    h-4
                    w-4
                    text-slate-500
                  "
                />

                <div
                  className="
                    text-[14px]
                    font-black
                    text-white
                  "
                >
                  {supplier.federationLatencyMs}ms
                </div>

              </div>

              {/* =========================================== */}
              {/* PROCUREMENT */}
              {/* =========================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <BadgeDollarSign
                  className="
                    h-4
                    w-4
                    text-[#38BDF8]
                  "
                />

                <div
                  className="
                    text-[14px]
                    font-black
                    text-white
                  "
                >
                  {supplier.procurementScore}
                </div>

              </div>

              {/* =========================================== */}
              {/* RELIABILITY */}
              {/* =========================================== */}

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Shield
                    className="
                      h-4
                      w-4
                      text-emerald-400
                    "
                  />

                  <div
                    className="
                      text-[14px]
                      font-black
                      text-white
                    "
                  >
                    {

                      Math.round(

                        (
                          supplier.procurementScore
                          +
                          supplier.telemetryScore
                        ) / 2
                      )
                    }
                  </div>

                </div>

              </div>

              {/* =========================================== */}
              {/* STATUS */}
              {/* =========================================== */}

              <div>

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

                      supplier.federationHealth === "HEALTHY"

                      ?

                      `
                      border-emerald-800
                      bg-emerald-950/30
                      text-emerald-300
                      `

                      :

                      supplier.federationHealth === "DEGRADED"

                      ?

                      `
                      border-amber-800
                      bg-amber-950/20
                      text-amber-300
                      `

                      :

                      `
                      border-red-800
                      bg-red-950/20
                      text-red-300
                      `
                    }
                  `}
                >

                  {

                    supplier.federationHealth === "HEALTHY"

                    ?

                    <CheckCircle2 className="h-3.5 w-3.5" />

                    :

                    <AlertTriangle className="h-3.5 w-3.5" />
                  }

                  {supplier.federationHealth}

                </div>

              </div>

            </div>
          ))
        }

      </div>

      {/* ==================================================== */}
      {/* FOOTER */}
      {/* ==================================================== */}

      <div
        className="
          grid
          gap-6

          xl:grid-cols-3
        "
      >

        <FederationInsightCard

          icon={
            <Activity className="h-5 w-5" />
          }

          title="Telemetry Stability"

          description="
            Federation telemetry operating within normal operational thresholds.
          "

          status="success"
        />

        <FederationInsightCard

          icon={
            <AlertTriangle className="h-5 w-5" />
          }

          title="Supplier Degradation"

          description="
            2 suppliers experiencing elevated federation response latency.
          "

          status="warning"
        />

        <FederationInsightCard

          icon={
            <ArrowUpRight className="h-5 w-5" />
          }

          title="Operational Spend"

          description="
            Tactical procurement activity increased 12% over previous telemetry cycle.
          "

          status="info"
        />

      </div>

    </div>
  )
}

// ============================================================
// STATUS
// ============================================================

function FederationStatusCard({

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
        rounded-full
        border
        border-slate-800
        bg-[#07101F]
        px-5
        py-4
      "
    >

      <div
        className="
          flex
          items-center
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

        <div>

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

          <div
            className="
              mt-1
              text-[13px]
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
// INSIGHT
// ============================================================

function FederationInsightCard({

  icon,
  title,
  description,
  status

}: {

  icon: React.ReactNode

  title: string

  description: string

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
        rounded-[28px]
        border
        border-slate-800
        bg-[#07101F]
        p-6
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

              status === "success"

              ?

              `
              border-emerald-800
              bg-emerald-950/20
              text-emerald-300
              `

              :

              status === "warning"

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
              text-[16px]
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