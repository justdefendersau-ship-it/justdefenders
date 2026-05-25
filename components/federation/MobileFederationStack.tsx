/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\federation\MobileFederationStack.tsx
 *
 * Timestamp:
 * 24 May 2026 08:42 Sydney
 *
 * PURPOSE:
 * Mobile Federation Compression System
 *
 * STRATEGY:
 * PASS 47.2 — Mobile Federation Compression
 *
 * OBJECTIVES:
 * - tactical supplier federation compression
 * - expedition-grade procurement density
 * - mobile acquisition readability
 * - compressed telemetry orchestration
 * - federation grouping systems
 * - mobile compare optimization
 * - tactical scan efficiency
 * - field-operational procurement workflows
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  ChevronDown,
  ChevronUp,
  Globe,
  Radar,
  Shield,
  ShoppingCart,
  Truck,
  Wifi

} from "lucide-react"

import {

  AnimatePresence,
  motion

} from "framer-motion"

import {

  useMemo,
  useState

} from "react"

// ============================================================
// TYPES
// ============================================================

interface FederationSupplier {

  id: string

  supplier: string

  region: string

  latency: string

  readiness: number

  telemetry: string

  expeditionScore: number

  status:
    "healthy"
    |
    "degraded"
    |
    "offline"

  activeParts: number

  acquisitionState:
    "LIVE"
    |
    "SYNCING"
    |
    "DEGRADED"
}

// ============================================================
// COMPONENT
// ============================================================

export default function MobileFederationStack({

  suppliers = [

    {

      id:
        "1",

      supplier:
        "LR Direct",

      region:
        "NSW",

      latency:
        "68ms",

      readiness:
        96,

      telemetry:
        "LIVE",

      expeditionScore:
        94,

      status:
        "healthy",

      activeParts:
        1421,

      acquisitionState:
        "LIVE"
    },

    {

      id:
        "2",

      supplier:
        "Bearmach",

      region:
        "QLD",

      latency:
        "82ms",

      readiness:
        88,

      telemetry:
        "LIVE",

      expeditionScore:
        91,

      status:
        "healthy",

      activeParts:
        1184,

      acquisitionState:
        "SYNCING"
    },

    {

      id:
        "3",

      supplier:
        "Terrain Tamer",

      region:
        "VIC",

      latency:
        "146ms",

      readiness:
        72,

      telemetry:
        "DEGRADED",

      expeditionScore:
        76,

      status:
        "degraded",

      activeParts:
        884,

      acquisitionState:
        "DEGRADED"
    }

  ]

}: {

  suppliers?: FederationSupplier[]

}){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    expanded,

    setExpanded

  ] = useState<string[]>([])

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const summary =
    useMemo(() => {

      const healthy =
        suppliers.filter(
          s => s.status === "healthy"
        ).length

      const degraded =
        suppliers.filter(
          s => s.status === "degraded"
        ).length

      return {

        healthy,
        degraded,
        total:
          suppliers.length
      }

    }, [suppliers])

  // ==========================================================
  // TOGGLE
  // ==========================================================

  function toggle(
    id: string
  ){

    setExpanded(prev =>

      prev.includes(id)

      ?

      prev.filter(p => p !== id)

      :

      [...prev, id]
    )
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        jd-operational-panel
        rounded-[26px]
        border
        border-slate-800
        bg-[#07101F]
        overflow-hidden
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <div
        className="
          border-b
          border-slate-800
          bg-[#020817]
          px-4
          py-4
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div>

            <div
              className="
                jd-section-label
              "
            >
              Mobile Federation
            </div>

            <div
              className="
                jd-panel-title
                mt-2
              "
            >
              Tactical Supplier Stack
            </div>

          </div>

          <div
            className="
              jd-live-pulse
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-800
              bg-cyan-950/20
              text-cyan-300
            "
          >

            <Radar className="h-5 w-5" />

          </div>

        </div>

        {/* =============================================== */}
        {/* SUMMARY */}
        {/* =============================================== */}

        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-3
          "
        >

          <SummaryNode
            label="Healthy"
            value={String(summary.healthy)}
            status="success"
          />

          <SummaryNode
            label="Degraded"
            value={String(summary.degraded)}
            status="warning"
          />

          <SummaryNode
            label="Nodes"
            value={String(summary.total)}
            status="info"
          />

        </div>

      </div>

      {/* ==================================================== */}
      {/* SUPPLIERS */}
      {/* ==================================================== */}

      <div
        className="
          divide-y
          divide-slate-800
        "
      >

        {

          suppliers.map(supplier => {

            const isExpanded =
              expanded.includes(
                supplier.id
              )

            return (

              <div
                key={supplier.id}
                className="
                  overflow-hidden
                "
              >

                {/* ========================================= */}
                {/* HEADER */}
                {/* ========================================= */}

                <button

                  onClick={() =>
                    toggle(supplier.id)
                  }

                  className="
                    w-full
                    px-4
                    py-4
                    text-left
                    transition-all
                    hover:bg-white/[0.02]
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    {/* =================================== */}
                    {/* LEFT */}
                    {/* =================================== */}

                    <div
                      className="
                        min-w-0
                        flex-1
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
                          className={`
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            border

                            ${

                              supplier.status === "healthy"

                              ?

                              `
                              border-emerald-800
                              bg-emerald-950/20
                              text-emerald-300
                              `

                              :

                              `
                              border-amber-800
                              bg-amber-950/20
                              text-amber-300
                              `
                            }
                          `}
                        >

                          <Truck className="h-5 w-5" />

                        </div>

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >

                          <div
                            className="
                              truncate
                              text-[13px]
                              font-black
                              uppercase
                              tracking-[0.08em]
                              text-white
                            "
                          >
                            {supplier.supplier}
                          </div>

                          <div
                            className="
                              mt-1
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <span
                              className="
                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.16em]
                                text-slate-500
                              "
                            >
                              {supplier.region}
                            </span>

                            <span
                              className="
                                text-slate-700
                              "
                            >
                              •
                            </span>

                            <span
                              className="
                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.16em]
                                text-cyan-300
                              "
                            >
                              {supplier.latency}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* =================================== */}
                    {/* RIGHT */}
                    {/* =================================== */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          text-right
                        "
                      >

                        <div
                          className={`

                            text-[18px]
                            font-black
                            tracking-[-0.08em]

                            ${

                              supplier.readiness >= 90

                              ?

                              "text-emerald-300"

                              :

                              supplier.readiness >= 75

                              ?

                              "text-amber-300"

                              :

                              "text-red-300"
                            }
                          `}
                        >
                          {supplier.readiness}
                        </div>

                        <div
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            text-slate-500
                          "
                        >
                          readiness
                        </div>

                      </div>

                      {

                        isExpanded

                        ?

                        <ChevronUp
                          className="
                            h-4
                            w-4
                            text-slate-500
                          "
                        />

                        :

                        <ChevronDown
                          className="
                            h-4
                            w-4
                            text-slate-500
                          "
                        />
                      }

                    </div>

                  </div>

                </button>

                {/* ========================================= */}
                {/* EXPANDED */}
                {/* ========================================= */}

                <AnimatePresence>

                  {

                    isExpanded

                    &&

                    <motion.div

                      initial={{

                        opacity: 0,
                        height: 0
                      }}

                      animate={{

                        opacity: 1,
                        height: "auto"
                      }}

                      exit={{

                        opacity: 0,
                        height: 0
                      }}

                      transition={{

                        duration: 0.18
                      }}

                      className="
                        overflow-hidden
                      "
                    >

                      <div
                        className="
                          border-t
                          border-slate-800
                          bg-[#020817]
                          p-4
                        "
                      >

                        {/* =============================== */}
                        {/* GRID */}
                        {/* =============================== */}

                        <div
                          className="
                            grid
                            grid-cols-2
                            gap-3
                          "
                        >

                          <TelemetryTile

                            icon={
                              <Wifi className="h-4 w-4" />
                            }

                            label="Telemetry"

                            value={supplier.telemetry}

                            status={
                              supplier.status === "healthy"
                              ? "success"
                              : "warning"
                            }

                          />

                          <TelemetryTile

                            icon={
                              <Globe className="h-4 w-4" />
                            }

                            label="Expedition"

                            value={`${supplier.expeditionScore}%`}

                            status="info"

                          />

                          <TelemetryTile

                            icon={
                              <ShoppingCart className="h-4 w-4" />
                            }

                            label="Inventory"

                            value={
                              String(
                                supplier.activeParts
                              )
                            }

                            status="success"

                          />

                          <TelemetryTile

                            icon={
                              <Activity className="h-4 w-4" />
                            }

                            label="Acquisition"

                            value={
                              supplier.acquisitionState
                            }

                            status={
                              supplier.acquisitionState === "LIVE"

                              ?

                              "success"

                              :

                              supplier.acquisitionState === "SYNCING"

                              ?

                              "info"

                              :

                              "warning"
                            }

                          />

                        </div>

                        {/* =============================== */}
                        {/* ACTIONS */}
                        {/* =============================== */}

                        <div
                          className="
                            mt-4
                            grid
                            grid-cols-2
                            gap-3
                          "
                        >

                          <button
                            className="
                              jd-button-motion
                              flex
                              items-center
                              justify-center
                              gap-2
                              rounded-[16px]
                              border
                              border-cyan-800
                              bg-cyan-600
                              px-4
                              py-3
                              text-[10px]
                              font-black
                              uppercase
                              tracking-[0.14em]
                              text-white
                            "
                          >

                            <Radar className="h-4 w-4" />

                            Intelligence

                          </button>

                          <button
                            className="
                              jd-button-motion
                              flex
                              items-center
                              justify-center
                              gap-2
                              rounded-[16px]
                              border
                              border-slate-700
                              bg-[#07101F]
                              px-4
                              py-3
                              text-[10px]
                              font-black
                              uppercase
                              tracking-[0.14em]
                              text-slate-300
                            "
                          >

                            <Shield className="h-4 w-4" />

                            Compare

                          </button>

                        </div>

                      </div>

                    </motion.div>
                  }

                </AnimatePresence>

              </div>
            )
          })
        }

      </div>

    </div>
  )
}

// ============================================================
// SUMMARY
// ============================================================

function SummaryNode({

  label,
  value,
  status

}: {

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
        rounded-[18px]
        border
        border-slate-800
        bg-[#07101F]
        p-3
        text-center
      "
    >

      <div
        className={`

          text-[18px]
          font-black
          tracking-[-0.08em]

          ${

            status === "success"

            ?

            "text-emerald-300"

            :

            status === "warning"

            ?

            "text-amber-300"

            :

            "text-cyan-300"
          }
        `}
      >
        {value}
      </div>

      <div
        className="
          mt-1
          text-[9px]
          font-black
          uppercase
          tracking-[0.16em]
          text-slate-500
        "
      >
        {label}
      </div>

    </div>
  )
}

// ============================================================
// TILE
// ============================================================

function TelemetryTile({

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
        rounded-[18px]
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
          className={`

            ${

              status === "success"

              ?

              "text-emerald-300"

              :

              status === "warning"

              ?

              "text-amber-300"

              :

              "text-cyan-300"
            }
          `}
        >
          {icon}
        </div>

        <div
          className={`

            text-[12px]
            font-black
            uppercase
            tracking-[0.08em]

            ${

              status === "success"

              ?

              "text-emerald-300"

              :

              status === "warning"

              ?

              "text-amber-300"

              :

              "text-cyan-300"
            }
          `}
        >
          {value}
        </div>

      </div>

      <div
        className="
          mt-3
          text-[9px]
          font-black
          uppercase
          tracking-[0.16em]
          text-slate-500
        "
      >
        {label}
      </div>

    </div>
  )
}