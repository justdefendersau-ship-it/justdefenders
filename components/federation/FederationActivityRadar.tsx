/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\federation\FederationActivityRadar.tsx
 *
 * Timestamp:
 * 24 May 2026 06:38 Sydney
 *
 * PURPOSE:
 * Federation Scan & Activity Systems
 *
 * STRATEGY:
 * PASS 46B.5 — Federation Scan & Activity Systems
 *
 * OBJECTIVES:
 * - federation scan sweeps
 * - tactical network visualization
 * - procurement acquisition motion
 * - radar-style telemetry orchestration
 * - distributed supplier awareness
 * - operational synchronization realism
 * - command-centre federation presence
 * - expedition-grade intelligence networking
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  Database,
  Radar,
  Shield,
  Truck,
  Wifi

} from "lucide-react"

import {

  motion

} from "framer-motion"

import {

  useMemo

} from "react"

// ============================================================
// TYPES
// ============================================================

interface FederationNode {

  id: string

  label: string

  x: number

  y: number

  status:
    "healthy"
    |
    "degraded"
    |
    "offline"

  type:
    "supplier"
    |
    "telemetry"
    |
    "procurement"
    |
    "federation"
}

interface FederationActivityRadarProps {

  nodes?: FederationNode[]

  activeScans?: number

  federationHealth?: number

  supplierSynchronization?: number
}

// ============================================================
// COMPONENT
// ============================================================

export default function FederationActivityRadar({

  nodes = [

    {

      id:
        "1",

      label:
        "LR Direct",

      x:
        20,

      y:
        32,

      status:
        "healthy",

      type:
        "supplier"
    },

    {

      id:
        "2",

      label:
        "Bearmach",

      x:
        72,

      y:
        18,

      status:
        "healthy",

      type:
        "supplier"
    },

    {

      id:
        "3",

      label:
        "Telemetry",

      x:
        48,

      y:
        46,

      status:
        "healthy",

      type:
        "telemetry"
    },

    {

      id:
        "4",

      label:
        "Federation",

      x:
        38,

      y:
        76,

      status:
        "healthy",

      type:
        "federation"
    },

    {

      id:
        "5",

      label:
        "Terrain Tamer",

      x:
        82,

      y:
        64,

      status:
        "degraded",

      type:
        "supplier"
    }
  ],

  activeScans = 3,

  federationHealth = 96,

  supplierSynchronization = 92

}: FederationActivityRadarProps){

  // ==========================================================
  // CONNECTIONS
  // ==========================================================

  const connections =
    useMemo(() => {

      return [

        ["1", "3"],
        ["2", "3"],
        ["3", "4"],
        ["5", "4"]

      ]

    }, [])

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
        rounded-[30px]
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
              Federation Activity Systems
            </div>

            <div
              className="
                jd-panel-title
                mt-2
              "
            >
              Tactical Intelligence Federation
            </div>

          </div>

          {/* =============================================== */}
          {/* STATUS */}
          {/* =============================================== */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <StatusBadge
              label="Scans"
              value={String(activeScans)}
              status="info"
            />

            <StatusBadge
              label="Federation"
              value={`${federationHealth}%`}
              status="success"
            />

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
        {/* RADAR */}
        {/* ================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-slate-800
            bg-[#020817]
            p-6
          "
        >

          {/* =============================================== */}
          {/* SWEEP */}
          {/* =============================================== */}

          <motion.div

            animate={{

              rotate:
                360
            }}

            transition={{

              repeat:
                Infinity,

              duration:
                8,

              ease:
                "linear"
            }}

            className="
              pointer-events-none
              absolute
              inset-0
              origin-center
            "
          >

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[140%]
                w-[2px]
                -translate-x-1/2
                -translate-y-1/2
                bg-gradient-to-b
                from-transparent
                via-cyan-400/60
                to-transparent
                blur-[1px]
              "
            />

          </motion.div>

          {/* =============================================== */}
          {/* GRID */}
          {/* =============================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
            "
          >

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[82%]
                w-[82%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-950
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[58%]
                w-[58%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-950/80
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[34%]
                w-[34%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-950/70
              "
            />

          </div>

          {/* =============================================== */}
          {/* CONNECTIONS */}
          {/* =============================================== */}

          <svg
            className="
              absolute
              inset-0
              h-full
              w-full
            "
          >

            {

              connections.map(

                ([fromId, toId], index) => {

                  const from =
                    nodes.find(
                      n => n.id === fromId
                    )

                  const to =
                    nodes.find(
                      n => n.id === toId
                    )

                  if(!from || !to){

                    return null
                  }

                  return (

                    <line

                      key={index}

                      x1={`${from.x}%`}
                      y1={`${from.y}%`}

                      x2={`${to.x}%`}
                      y2={`${to.y}%`}

                      stroke="
                        rgba(56,189,248,0.18)
                      "

                      strokeWidth="1.2"

                      strokeDasharray="5 4"
                    />
                  )
                }
              )
            }

          </svg>

          {/* =============================================== */}
          {/* NODES */}
          {/* =============================================== */}

          <div
            className="
              relative
              h-[440px]
            "
          >

            {

              nodes.map(node => (

                <motion.div

                  key={node.id}

                  animate={{

                    scale:
                      [1, 1.06, 1],

                    opacity:
                      [0.92, 1, 0.92]
                  }}

                  transition={{

                    repeat:
                      Infinity,

                    duration:
                      2.8,

                    delay:
                      Number(node.id) * 0.3
                  }}

                  style={{

                    left:
                      `${node.x}%`,

                    top:
                      `${node.y}%`
                  }}

                  className="
                    absolute
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                >

                  <div
                    className={`
                      jd-live-pulse
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      shadow-[0_0_40px_rgba(0,0,0,0.30)]

                      ${

                        node.status === "healthy"

                        ?

                        `
                        border-emerald-800
                        bg-emerald-950/20
                        text-emerald-300
                        `

                        :

                        node.status === "degraded"

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

                      node.type === "supplier"

                      ?

                      <Truck className="h-6 w-6" />

                      :

                      node.type === "telemetry"

                      ?

                      <Wifi className="h-6 w-6" />

                      :

                      node.type === "procurement"

                      ?

                      <Database className="h-6 w-6" />

                      :

                      <Shield className="h-6 w-6" />
                    }

                  </div>

                  {/* ======================================= */}
                  {/* LABEL */}
                  {/* ======================================= */}

                  <div
                    className="
                      mt-3
                      text-center
                    "
                  >

                    <div
                      className="
                        text-[11px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-white
                      "
                    >
                      {node.label}
                    </div>

                    <div
                      className={`

                        mt-1
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.16em]

                        ${

                          node.status === "healthy"

                          ?

                          "text-emerald-300"

                          :

                          node.status === "degraded"

                          ?

                          "text-amber-300"

                          :

                          "text-red-300"
                        }
                      `}
                    >
                      {node.status}
                    </div>

                  </div>

                </motion.div>
              ))
            }

          </div>

        </div>

        {/* ================================================== */}
        {/* TELEMETRY */}
        {/* ================================================== */}

        <div
          className="
            grid
            gap-4

            lg:grid-cols-3
          "
        >

          <TelemetryCard

            label="Supplier Sync"

            value={`${supplierSynchronization}%`}

            icon={
              <Activity className="h-5 w-5" />
            }

            status="success"

            description="
              Procurement supplier federation
              currently synchronized.
            "

          />

          <TelemetryCard

            label="Acquisition"

            value="ACTIVE"

            icon={
              <Radar className="h-5 w-5" />
            }

            status="info"

            description="
              Tactical supplier acquisition sweep
              actively polling federation nodes.
            "

          />

          <TelemetryCard

            label="Routing"

            value="LIVE"

            icon={
              <Wifi className="h-5 w-5" />
            }

            status="success"

            description="
              Operational telemetry routing layer
              currently streaming intelligence.
            "

          />

        </div>

      </div>

    </div>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryCard({

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
// STATUS
// ============================================================

function StatusBadge({

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