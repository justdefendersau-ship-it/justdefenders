/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\tooltips\OperationalTooltip.tsx
 *
 * Timestamp:
 * 24 May 2026 04:28 Sydney
 *
 * PURPOSE:
 * Advanced Tactical Operational Intelligence Tooltip System
 *
 * STRATEGY:
 * PASS 46B.1 — Advanced Tooltip Intelligence
 *
 * OBJECTIVES:
 * - operational intelligence briefing overlays
 * - tactical procurement guidance
 * - expedition advisory intelligence
 * - federation interpretation systems
 * - survivability recommendations
 * - contextual operational overlays
 * - multi-layer intelligence presentation
 * - command-centre tooltip realism
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Info,
  Shield,
  Truck,
  Wrench

} from "lucide-react"

import {

  AnimatePresence,
  motion

} from "framer-motion"

import {

  useEffect,
  useRef,
  useState

} from "react"

// ============================================================
// TYPES
// ============================================================

export interface OperationalTooltipProps {

  title: string

  description: string

  guidance?: string

  operationalImpact?: string

  expeditionAdvisory?: string

  recommendation?: string

  telemetry?: {

    label: string

    value: string

    status?:
      "success"
      |
      "warning"
      |
      "critical"
      |
      "info"

  }[]

  severity?:
    "info"
    |
    "success"
    |
    "warning"
    |
    "critical"

  category?:
    "telemetry"
    |
    "maintenance"
    |
    "expedition"
    |
    "readiness"
    |
    "federation"

  children:
    React.ReactNode

  width?: number
}

// ============================================================
// COMPONENT
// ============================================================

export default function OperationalTooltip({

  title,
  description,
  guidance,
  operationalImpact,
  expeditionAdvisory,
  recommendation,
  telemetry = [],
  severity = "info",
  category = "telemetry",
  children,
  width = 420

}: OperationalTooltipProps){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    visible,

    setVisible

  ] = useState(false)

  const containerRef =
    useRef<HTMLDivElement | null>(null)

  // ==========================================================
  // OUTSIDE CLICK
  // ==========================================================

  useEffect(() => {

    function handleOutside(
      event: MouseEvent
    ){

      if (

        containerRef.current
        &&
        !containerRef.current.contains(
          event.target as Node
        )

      ){

        setVisible(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutside
    )

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutside
      )
    }

  }, [])

  // ==========================================================
  // ICON
  // ==========================================================

  const Icon =
    getCategoryIcon(category)

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      ref={containerRef}
      className="
        relative
        inline-flex
      "
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => setVisible(v => !v)}
    >

      {/* ==================================================== */}
      {/* TARGET */}
      {/* ==================================================== */}

      <div
        className="
          cursor-help
        "
      >
        {children}
      </div>

      {/* ==================================================== */}
      {/* TOOLTIP */}
      {/* ==================================================== */}

      <AnimatePresence>

        {

          visible

          &&

          <motion.div

            initial={{

              opacity: 0,
              y: 8,
              scale: 0.985
            }}

            animate={{

              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{

              opacity: 0,
              y: 8,
              scale: 0.985
            }}

            transition={{

              duration: 0.16
            }}

            style={{

              width
            }}

            className="
              jd-tooltip-motion
              jd-operational-panel
              jd-scan-lines
              absolute
              left-1/2
              top-[calc(100%+18px)]
              z-[120]
              -translate-x-1/2
              overflow-hidden
              rounded-[30px]
              border
              border-slate-800
              bg-[#07101F]
              shadow-[0_0_80px_rgba(0,0,0,0.50)]
              backdrop-blur-xl
            "
          >

            {/* =============================================== */}
            {/* HEADER */}
            {/* =============================================== */}

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
                  flex
                  items-start
                  gap-5
                "
              >

                {/* ========================================= */}
                {/* ICON */}
                {/* ========================================= */}

                <div
                  className={`
                    jd-live-pulse
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
                      jd-glow-green
                      `

                      :

                      severity === "warning"

                      ?

                      `
                      border-amber-800
                      bg-amber-950/20
                      text-amber-300
                      jd-glow-amber
                      `

                      :

                      severity === "critical"

                      ?

                      `
                      border-red-800
                      bg-red-950/20
                      text-red-300
                      jd-glow-red
                      `

                      :

                      `
                      border-cyan-800
                      bg-cyan-950/20
                      text-cyan-300
                      jd-glow-cyan
                      `
                    }
                  `}
                >

                  <Icon className="h-6 w-6" />

                </div>

                {/* ========================================= */}
                {/* TEXT */}
                {/* ========================================= */}

                <div
                  className="
                    flex-1
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
                    Operational Intelligence Briefing
                  </div>

                  <div
                    className="
                      mt-2
                      text-[20px]
                      font-black
                      tracking-[-0.05em]
                      text-white
                    "
                  >
                    {title}
                  </div>

                  <div
                    className="
                      mt-3
                      text-[12px]
                      uppercase
                      tracking-[0.16em]
                      text-slate-500
                    "
                  >
                    Tactical Advisory Layer
                  </div>

                </div>

              </div>

            </div>

            {/* =============================================== */}
            {/* BODY */}
            {/* =============================================== */}

            <div
              className="
                p-6
                space-y-5
              "
            >

              {/* =========================================== */}
              {/* SUMMARY */}
              {/* =========================================== */}

              <BriefingSection
                title="Operational Summary"
                content={description}
              />

              {/* =========================================== */}
              {/* GUIDANCE */}
              {/* =========================================== */}

              {

                guidance

                &&

                <BriefingSection
                  title="Tactical Guidance"
                  content={guidance}
                  accent="cyan"
                />
              }

              {/* =========================================== */}
              {/* IMPACT */}
              {/* =========================================== */}

              {

                operationalImpact

                &&

                <BriefingSection
                  title="Operational Impact"
                  content={operationalImpact}
                  accent="amber"
                />
              }

              {/* =========================================== */}
              {/* EXPEDITION */}
              {/* =========================================== */}

              {

                expeditionAdvisory

                &&

                <BriefingSection
                  title="Expedition Advisory"
                  content={expeditionAdvisory}
                  accent="green"
                />
              }

              {/* =========================================== */}
              {/* RECOMMENDATION */}
              {/* =========================================== */}

              {

                recommendation

                &&

                <div
                  className="
                    rounded-[24px]
                    border
                    border-cyan-900
                    bg-cyan-950/10
                    p-5
                  "
                >

                  <div
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.22em]
                      text-[#38BDF8]
                    "
                  >
                    Tactical Recommendation
                  </div>

                  <div
                    className="
                      mt-3
                      text-[13px]
                      leading-relaxed
                      text-slate-300
                    "
                  >
                    {recommendation}
                  </div>

                </div>
              }

              {/* =========================================== */}
              {/* TELEMETRY */}
              {/* =========================================== */}

              {

                telemetry.length > 0

                &&

                <div>

                  <div
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.22em]
                      text-slate-500
                    "
                  >
                    Federation Telemetry
                  </div>

                  <div
                    className="
                      mt-4
                      grid
                      gap-3
                      sm:grid-cols-2
                    "
                  >

                    {

                      telemetry.map(item => (

                        <TelemetryNode

                          key={item.label}

                          label={item.label}

                          value={item.value}

                          status={
                            item.status || "info"
                          }

                        />
                      ))
                    }

                  </div>

                </div>
              }

            </div>

            {/* =============================================== */}
            {/* FOOTER */}
            {/* =============================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
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
                  tracking-[0.20em]
                  text-slate-600
                "
              >
                JustDefenders© Tactical Intelligence
              </div>

              <div
                className={`
                  rounded-full
                  border
                  px-4
                  py-2
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]

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

                    severity === "critical"

                    ?

                    `
                    border-red-800
                    bg-red-950/20
                    text-red-300
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
                {severity}
              </div>

            </div>

          </motion.div>
        }

      </AnimatePresence>

    </div>
  )
}

// ============================================================
// BRIEFING SECTION
// ============================================================

function BriefingSection({

  title,
  content,
  accent = "default"

}: {

  title: string

  content: string

  accent?:
    "default"
    |
    "cyan"
    |
    "amber"
    |
    "green"

}){

  return (

    <div
      className={`
        rounded-[24px]
        border
        p-5

        ${

          accent === "cyan"

          ?

          `
          border-cyan-900
          bg-cyan-950/10
          `

          :

          accent === "amber"

          ?

          `
          border-amber-900
          bg-amber-950/10
          `

          :

          accent === "green"

          ?

          `
          border-emerald-900
          bg-emerald-950/10
          `

          :

          `
          border-slate-800
          bg-[#020817]
          `
        }
      `}
    >

      <div
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[0.22em]
          text-slate-500
        "
      >
        {title}
      </div>

      <div
        className="
          mt-3
          text-[13px]
          leading-relaxed
          text-slate-300
        "
      >
        {content}
      </div>

    </div>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryNode({

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
    "critical"
    |
    "info"

}){

  return (

    <div
      className="
        jd-node-motion
        rounded-[20px]
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
          className={`

            text-[14px]
            font-black

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
          {value}
        </div>

      </div>

    </div>
  )
}

// ============================================================
// ICONS
// ============================================================

function getCategoryIcon(

  category:
    "telemetry"
    |
    "maintenance"
    |
    "expedition"
    |
    "readiness"
    |
    "federation"

){

  switch(category){

    case "maintenance":

      return Wrench

    case "expedition":

      return Globe

    case "readiness":

      return Shield

    case "federation":

      return Activity

    default:

      return Info
  }
}

// ============================================================
// QUICK HELPERS
// ============================================================

export function TacticalInfoBadge({

  label,
  tooltipTitle,
  tooltipDescription,
  tooltipGuidance,
  tooltipImpact,
  tooltipExpedition,
  recommendation,
  severity = "info"

}: {

  label: string

  tooltipTitle: string

  tooltipDescription: string

  tooltipGuidance?: string

  tooltipImpact?: string

  tooltipExpedition?: string

  recommendation?: string

  severity?:
    "info"
    |
    "success"
    |
    "warning"
    |
    "critical"

}){

  return (

    <OperationalTooltip

      title={tooltipTitle}

      description={tooltipDescription}

      guidance={tooltipGuidance}

      operationalImpact={tooltipImpact}

      expeditionAdvisory={tooltipExpedition}

      recommendation={recommendation}

      severity={severity}

    >

      <div
        className="
          jd-button-motion
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-slate-700
          bg-[#07101F]
          px-3
          py-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          text-slate-300
          transition-all
          hover:border-slate-600
          hover:text-white
        "
      >

        <Info className="h-3.5 w-3.5" />

        {label}

      </div>

    </OperationalTooltip>
  )
}

export function OperationalStatusHint({

  status,
  description

}: {

  status: string

  description: string

}){

  return (

    <OperationalTooltip

      title={status}

      description={description}

      operationalImpact="
        Operational telemetry remains stable
        within current federation thresholds.
      "

      expeditionAdvisory="
        Expedition survivability confidence
        currently operating within tactical limits.
      "

      recommendation="
        Continue monitoring federation telemetry
        for procurement degradation events.
      "

      telemetry={[

        {

          label:
            "Federation",

          value:
            "LIVE",

          status:
            "success"
        },

        {

          label:
            "Latency",

          value:
            "69ms",

          status:
            "info"
        }
      ]}

      severity="info"

      category="telemetry"

    >

      <div
        className="
          inline-flex
          items-center
          gap-2
          text-[#38BDF8]
        "
      >

        <Info className="h-4 w-4" />

      </div>

    </OperationalTooltip>
  )
}