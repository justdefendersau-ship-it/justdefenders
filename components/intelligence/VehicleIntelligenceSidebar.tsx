/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\intelligence\VehicleIntelligenceSidebar.tsx
 *
 * Timestamp:
 * 22 May 2026 09:02 Sydney
 *
 * PURPOSE:
 * Tactical Vehicle Intelligence Sidebar
 *
 * STRATEGY:
 * PASS 30A — Sidebar Compression Stabilization
 *
 * OBJECTIVES:
 * - reduce sidebar dominance
 * - improve operational balance
 * - improve tactical density
 * - compress federation intelligence rhythm
 * - stabilize Alpha operational presentation
 *
 * ============================================================
 */

"use client"

import {
  Shield,
  Activity,
  Globe,
  Truck,
  BadgeCheck,
  Clock3,
  Database,
  AlertTriangle,
  CheckCircle2,
  Layers3
} from "lucide-react"

// ============================================================
// COMPONENT
// ============================================================

export default function VehicleIntelligenceSidebar(){

  return (

    <aside
      className="
        sticky
        top-[120px]
        space-y-3
      "
    >

      {/* ==================================================== */}
      {/* VEHICLE */}
      {/* ==================================================== */}

      <section
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        <div
          className="
            border-b
            border-slate-900
            px-5
            py-3
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
            Active Vehicle
          </div>

          <div
            className="
              mt-2
              text-[22px]
              font-black
              leading-tight
              text-white
            "
          >
            Defender 110
          </div>

          <div
            className="
              mt-1
              text-[14px]
              font-semibold
              text-slate-400
            "
          >
            300Tdi · 1994-1998
          </div>

        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            p-4
          "
        >

          <SidebarMetric
            label="Fitment"
            value="97%"
            color="green"
          />

          <SidebarMetric
            label="Federation"
            value="LIVE"
            color="blue"
          />

          <SidebarMetric
            label="OEM"
            value="HIGH"
            color="green"
          />

          <SidebarMetric
            label="Latency"
            value="420ms"
            color="amber"
          />

        </div>

      </section>

      {/* ==================================================== */}
      {/* FEDERATION */}
      {/* ==================================================== */}

      <section
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        <div
          className="
            border-b
            border-slate-900
            px-5
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

            <Activity
              className="
                h-5
                w-5
                text-[#38BDF8]
              "
            />

            <div
              className="
                text-[16px]
                font-black
                text-white
              "
            >
              Federation Status
            </div>

          </div>

        </div>

        <div
          className="
            space-y-2
            p-4
          "
        >

          <FederationRow
            supplier="Repco"
            latency="341ms"
            healthy
          />

          <FederationRow
            supplier="Burson"
            latency="420ms"
            healthy
          />

          <FederationRow
            supplier="LR Direct"
            latency="610ms"
            healthy
          />

        </div>

      </section>

      {/* ==================================================== */}
      {/* PROCUREMENT */}
      {/* ==================================================== */}

      <section
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        <div
          className="
            border-b
            border-slate-900
            px-5
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

            <Shield
              className="
                h-5
                w-5
                text-[#38BDF8]
              "
            />

            <div
              className="
                text-[16px]
                font-black
                text-white
              "
            >
              Procurement Intelligence
            </div>

          </div>

        </div>

        <div
          className="
            space-y-2
            p-4
          "
        >

          <IntelRow
            icon={<BadgeCheck className="h-4 w-4" />}
            label="OEM Confidence"
            value="High"
            green
          />

          <IntelRow
            icon={<Truck className="h-4 w-4" />}
            label="Operational Stock"
            value="Available"
            green
          />

          <IntelRow
            icon={<Globe className="h-4 w-4" />}
            label="AU Federation"
            value="Connected"
            blue
          />

          <IntelRow
            icon={<Database className="h-4 w-4" />}
            label="Sources"
            value="6 Live"
          />

          <IntelRow
            icon={<Clock3 className="h-4 w-4" />}
            label="Dispatch"
            value="2.1d"
          />

        </div>

      </section>

      {/* ==================================================== */}
      {/* READINESS */}
      {/* ==================================================== */}

      <section
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-800
          bg-[#07101F]
        "
      >

        <div
          className="
            border-b
            border-slate-900
            px-5
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

            <Layers3
              className="
                h-5
                w-5
                text-[#38BDF8]
              "
            />

            <div
              className="
                text-[16px]
                font-black
                text-white
              "
            >
              Operational Readiness
            </div>

          </div>

        </div>

        <div
          className="
            space-y-2
            p-4
          "
        >

          <ReadinessRow
            label="Expedition Ready"
            status="READY"
            healthy
          />

          <ReadinessRow
            label="Supplier Coverage"
            status="GOOD"
            healthy
          />

          <ReadinessRow
            label="Procurement Risk"
            status="LOW"
            healthy
          />

          <ReadinessRow
            label="Supply Volatility"
            status="STABLE"
            healthy
          />

        </div>

      </section>

      {/* ==================================================== */}
      {/* ALERTS */}
      {/* ==================================================== */}

      <section
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-[#3B2407]
          bg-[#1A1207]
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
            p-4
          "
        >

          <AlertTriangle
            className="
              mt-0.5
              h-5
              w-5
              text-[#FBBF24]
            "
          />

          <div>

            <div
              className="
                text-[14px]
                font-black
                text-[#FBBF24]
              "
            >
              Operational Notice
            </div>

            <div
              className="
                mt-1
                text-[13px]
                leading-relaxed
                text-[#FDE68A]
              "
            >
              Expedition procurement confidence remains high across active supplier federation.
            </div>

          </div>

        </div>

      </section>

    </aside>
  )
}

// ============================================================
// METRIC
// ============================================================

function SidebarMetric({

  label,

  value,

  color

}: {

  label: string

  value: string

  color:
    "green"
    |
    "blue"
    |
    "amber"
}){

  const colors = {

    green:
      "text-[#4ADE80]",

    blue:
      "text-[#60A5FA]",

    amber:
      "text-[#FBBF24]"
  }

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        p-3
      "
    >

      <div
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          text-slate-500
        "
      >
        {label}
      </div>

      <div
        className={`
          mt-1
          text-[20px]
          font-black
          ${colors[color]}
        `}
      >
        {value}
      </div>

    </div>
  )
}

// ============================================================
// FEDERATION ROW
// ============================================================

function FederationRow({

  supplier,

  latency,

  healthy

}: {

  supplier: string

  latency: string

  healthy?: boolean

}){

  return (

    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        px-4
        py-2
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        {

          healthy

          ?

          <CheckCircle2
            className="
              h-4
              w-4
              text-[#4ADE80]
            "
          />

          :

          <AlertTriangle
            className="
              h-4
              w-4
              text-red-400
            "
          />
        }

        <div
          className="
            text-[13px]
            font-black
            text-white
          "
        >
          {supplier}
        </div>

      </div>

      <div
        className="
          text-[12px]
          font-bold
          text-slate-400
        "
      >
        {latency}
      </div>

    </div>
  )
}

// ============================================================
// INTEL ROW
// ============================================================

function IntelRow({

  icon,

  label,

  value,

  green,

  blue

}: {

  icon: React.ReactNode

  label: string

  value: string

  green?: boolean

  blue?: boolean

}){

  return (

    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        px-4
        py-2
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
            text-slate-500
          "
        >
          {icon}
        </div>

        <div
          className="
            text-[13px]
            font-semibold
            text-slate-300
          "
        >
          {label}
        </div>

      </div>

      <div
        className={`
          text-[12px]
          font-black

          ${
            green

            ?

            "text-[#4ADE80]"

            :

            blue

            ?

            "text-[#60A5FA]"

            :

            "text-white"
          }
        `}
      >
        {value}
      </div>

    </div>
  )
}

// ============================================================
// READINESS ROW
// ============================================================

function ReadinessRow({

  label,

  status,

  healthy

}: {

  label: string

  status: string

  healthy?: boolean

}){

  return (

    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-800
        bg-[#050C18]
        px-4
        py-2
      "
    >

      <div
        className="
          text-[13px]
          font-semibold
          text-slate-300
        "
      >
        {label}
      </div>

      <div
        className={`
          text-[12px]
          font-black

          ${
            healthy

            ?

            "text-[#4ADE80]"

            :

            "text-red-400"
          }
        `}
      >
        {status}
      </div>

    </div>
  )
}