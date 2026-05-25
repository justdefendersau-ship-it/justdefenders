/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\system\OperationalStreamingLayer.tsx
 *
 * Timestamp:
 * 24 May 2026 06:02 Sydney
 *
 * PURPOSE:
 * Tactical Loading & Streaming States Layer
 *
 * STRATEGY:
 * PASS 46B.4 — Tactical Loading & Streaming States
 *
 * OBJECTIVES:
 * - federation synchronization states
 * - telemetry acquisition visualization
 * - procurement streaming realism
 * - operational activation states
 * - tactical acquisition sweeps
 * - real-time operational continuity
 * - command-centre streaming intelligence
 * - expedition-grade federation realism
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  Database,
  LoaderCircle,
  Radar,
  RefreshCw,
  Shield,
  Truck,
  Wifi

} from "lucide-react"

import {

  motion

} from "framer-motion"

import {

  useEffect,
  useMemo,
  useState

} from "react"

// ============================================================
// TYPES
// ============================================================

export interface OperationalStreamingLayerProps {

  federationConnected?: boolean

  telemetryStreaming?: boolean

  synchronizationProgress?: number

  suppliersOnline?: number

  federationNodes?: number

  lastRefresh?: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function OperationalStreamingLayer({

  federationConnected = true,

  telemetryStreaming = true,

  synchronizationProgress = 92,

  suppliersOnline = 14,

  federationNodes = 5,

  lastRefresh = "2s ago"

}: OperationalStreamingLayerProps){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    pulse,

    setPulse

  ] = useState(false)

  useEffect(() => {

    const interval =
      setInterval(() => {

        setPulse(v => !v)

      }, 2800)

    return () => clearInterval(interval)

  }, [])

  // ==========================================================
  // STATUS
  // ==========================================================

  const federationStatus =
    useMemo(() => {

      if(!federationConnected){

        return "OFFLINE"
      }

      if(synchronizationProgress < 70){

        return "DEGRADED"
      }

      return "LIVE"

    }, [

      federationConnected,
      synchronizationProgress
    ])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        jd-operational-panel
        jd-panel-enter
        jd-atmosphere
        overflow-hidden
        rounded-[28px]
        border
        border-slate-800
        bg-[#07101F]
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
          px-5
          py-4
        "
      >

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
                jd-section-label
              "
            >
              Federation Synchronization
            </div>

            <div
              className="
                jd-panel-title
                mt-2
              "
            >
              Operational Streaming Intelligence
            </div>

          </div>

          {/* =============================================== */}
          {/* STATUS */}
          {/* =============================================== */}

          <div
            className={`
              jd-live-pulse
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              px-4
              py-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]

              ${

                federationStatus === "LIVE"

                ?

                `
                border-emerald-800
                bg-emerald-950/20
                text-emerald-300
                `

                :

                federationStatus === "DEGRADED"

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

            <Activity className="h-3.5 w-3.5" />

            {federationStatus}

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* CONTENT */}
      {/* ==================================================== */}

      <div
        className="
          p-5
          space-y-5
        "
      >

        {/* ================================================== */}
        {/* STREAMING RAIL */}
        {/* ================================================== */}

        <div
          className="
            jd-telemetry-sweep
            relative
            overflow-hidden
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
              flex-wrap
              items-center
              justify-between
              gap-5
            "
          >

            {/* ============================================= */}
            {/* LEFT */}
            {/* ============================================= */}

            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              <motion.div

                animate={{

                  rotate:
                    telemetryStreaming
                    ? 360
                    : 0
                }}

                transition={{

                  repeat:
                    Infinity,

                  duration:
                    3.2,

                  ease:
                    "linear"
                }}

                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-cyan-800
                  bg-cyan-950/20
                  text-cyan-300
                "
              >

                <Radar className="h-6 w-6" />

              </motion.div>

              <div>

                <div
                  className="
                    jd-heading
                  "
                >
                  Tactical Federation Stream
                </div>

                <div
                  className="
                    jd-muted
                    mt-2
                  "
                >
                  Live procurement federation telemetry
                  synchronized across operational supplier nodes.
                </div>

              </div>

            </div>

            {/* ============================================= */}
            {/* RIGHT */}
            {/* ============================================= */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <StreamBadge
                label="Telemetry"
                value={
                  telemetryStreaming
                  ? "STREAMING"
                  : "PAUSED"
                }
                status={
                  telemetryStreaming
                  ? "success"
                  : "warning"
                }
              />

              <StreamBadge
                label="Refresh"
                value={lastRefresh}
                status="info"
              />

            </div>

          </div>

          {/* =============================================== */}
          {/* PROGRESS */}
          {/* =============================================== */}

          <div
            className="
              mt-5
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
                  jd-telemetry-label
                "
              >
                Federation Synchronization
              </div>

              <div
                className="
                  jd-telemetry-value
                  text-cyan-300
                "
              >
                {synchronizationProgress}%
              </div>

            </div>

            <div
              className="
                mt-3
                h-2
                overflow-hidden
                rounded-full
                bg-slate-900
              "
            >

              <motion.div

                initial={{

                  width: 0
                }}

                animate={{

                  width:
                    `${synchronizationProgress}%`
                }}

                transition={{

                  duration: 1
                }}

                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-emerald-400
                "
              />

            </div>

          </div>

        </div>

        {/* ================================================== */}
        {/* GRID */}
        {/* ================================================== */}

        <div
          className="
            grid
            gap-4

            lg:grid-cols-4
          "
        >

          <StreamingNode

            label="Suppliers"

            value={String(suppliersOnline)}

            icon={
              <Truck className="h-5 w-5" />
            }

            status="success"

            description="
              Operational procurement suppliers
              currently synchronized.
            "

          />

          <StreamingNode

            label="Federation Nodes"

            value={String(federationNodes)}

            icon={
              <Database className="h-5 w-5" />
            }

            status="info"

            description="
              Tactical federation intelligence
              network currently online.
            "

          />

          <StreamingNode

            label="Telemetry"

            value={
              telemetryStreaming
              ? "LIVE"
              : "PAUSED"
            }

            icon={
              <Wifi className="h-5 w-5" />
            }

            status={
              telemetryStreaming
              ? "success"
              : "warning"
            }

            description="
              Rolling operational telemetry
              acquisition status.
            "

          />

          <StreamingNode

            label="Refresh"

            value="ACTIVE"

            icon={
              <RefreshCw className="h-5 w-5" />
            }

            status="info"

            description="
              Federation synchronization and
              procurement refresh orchestration.
            "

          />

        </div>

        {/* ================================================== */}
        {/* ACTIVITY FEED */}
        {/* ================================================== */}

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

            <div>

              <div
                className="
                  jd-section-label
                "
              >
                Live Operational Feed
              </div>

              <div
                className="
                  jd-heading
                  mt-2
                "
              >
                Federation Activity Stream
              </div>

            </div>

            <div
              className="
                jd-live-pulse
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-emerald-800
                bg-emerald-950/20
                text-emerald-300
              "
            >

              <LoaderCircle
                className="
                  h-5
                  w-5
                  animate-spin
                "
              />

            </div>

          </div>

          {/* =============================================== */}
          {/* EVENTS */}
          {/* =============================================== */}

          <div
            className="
              mt-5
              space-y-3
            "
          >

            <FeedEvent

              pulse={pulse}

              title="
                Federation synchronization completed
              "

              detail="
                Supplier procurement telemetry refreshed
                across Australian operational nodes.
              "

              status="success"

            />

            <FeedEvent

              pulse={!pulse}

              title="
                Expedition intelligence recalculated
              "

              detail="
                Tactical survivability scoring updated
                from predictive maintenance telemetry.
              "

              status="info"

            />

            <FeedEvent

              pulse={pulse}

              title="
                Procurement federation scan active
              "

              detail="
                Live supplier acquisition sweep currently
                synchronizing operational inventory states.
              "

              status="warning"

            />

          </div>

        </div>

      </div>

    </div>
  )
}

// ============================================================
// NODE
// ============================================================

function StreamingNode({

  label,
  value,
  icon,
  status,
  description

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

  description: string

}){

  return (

    <div
      className="
        jd-node-motion
        jd-telemetry-node
        rounded-[22px]
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

              status === "critical"

              ?

              "text-red-300"

              :

              "text-cyan-300"
            }
          `}
        >
          {icon}
        </div>

        <div
          className="
            jd-telemetry-value
          "
        >
          {value}
        </div>

      </div>

      <div
        className="
          jd-telemetry-label
          mt-4
        "
      >
        {label}
      </div>

      <div
        className="
          jd-muted
          mt-3
        "
      >
        {description}
      </div>

    </div>
  )
}

// ============================================================
// FEED
// ============================================================

function FeedEvent({

  title,
  detail,
  status,
  pulse

}: {

  title: string

  detail: string

  status:
    "success"
    |
    "warning"
    |
    "info"

  pulse: boolean

}){

  return (

    <motion.div

      animate={{

        opacity:
          pulse ? 1 : 0.92
      }}

      transition={{

        duration: 1.4
      }}

      className={`
        rounded-[20px]
        border
        p-4

        ${

          status === "success"

          ?

          `
          border-emerald-900
          bg-emerald-950/10
          `

          :

          status === "warning"

          ?

          `
          border-amber-900
          bg-amber-950/10
          `

          :

          `
          border-cyan-900
          bg-cyan-950/10
          `
        }
      `}
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        <div
          className={`
            mt-1
            h-2.5
            w-2.5
            rounded-full

            ${

              status === "success"

              ?

              "bg-emerald-400"

              :

              status === "warning"

              ?

              "bg-amber-400"

              :

              "bg-cyan-400"
            }
          `}
        />

        <div
          className="
            flex-1
          "
        >

          <div
            className="
              jd-alert-title
              text-white
            "
          >
            {title}
          </div>

          <div
            className="
              jd-alert-body
              mt-2
            "
          >
            {detail}
          </div>

        </div>

      </div>

    </motion.div>
  )
}

// ============================================================
// BADGE
// ============================================================

function StreamBadge({

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
      className={`
        inline-flex
        items-center
        gap-3
        rounded-full
        border
        px-4
        py-2

        ${

          status === "success"

          ?

          `
          border-emerald-800
          bg-emerald-950/20
          `

          :

          status === "warning"

          ?

          `
          border-amber-800
          bg-amber-950/20
          `

          :

          `
          border-cyan-800
          bg-cyan-950/20
          `
        }
      `}
    >

      <div
        className="
          jd-telemetry-label
        "
      >
        {label}
      </div>

      <div
        className={`

          text-[11px]
          font-black
          uppercase
          tracking-[0.14em]

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
  )
}