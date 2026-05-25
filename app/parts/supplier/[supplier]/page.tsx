/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\parts\supplier\[supplier]\page.tsx
 *
 * Timestamp:
 * 24 May 2026 13:52 Sydney
 *
 * PURPOSE:
 * Tactical Supplier Intelligence Page
 *
 * STRATEGY:
 * PASS 44A / PASS 46 / PASS 47
 *
 * OBJECTIVES:
 * - production-safe supplier routing
 * - operational supplier intelligence
 * - tactical procurement visibility
 * - responsive mobile orchestration
 * - federation-ready supplier views
 * - expedition-grade dark operational UI
 *
 * ============================================================
 */

"use client"

import Link from "next/link"

import {

  useMemo

} from "react"

import {

  useParams

} from "next/navigation"

// ============================================================
// TYPES
// ============================================================

interface SupplierMetadata {

  id: string

  name: string

  region: string

  health:
    "HEALTHY"
    |
    "DEGRADED"
    |
    "OFFLINE"

  latencyMs: number

  activeFeeds: number

  expeditionScore: number

  description: string
}

// ============================================================
// MOCK DATA
// ============================================================

const SUPPLIERS:
  Record<string, SupplierMetadata> = {

    repco: {

      id: "repco",

      name: "Repco",

      region: "Australia",

      health: "HEALTHY",

      latencyMs: 241,

      activeFeeds: 18,

      expeditionScore: 92,

      description:
        "High-volume tactical supplier federation optimized for rapid Australian operational procurement."
    },

    burson: {

      id: "burson",

      name: "Burson Auto Parts",

      region: "Australia",

      health: "HEALTHY",

      latencyMs: 328,

      activeFeeds: 12,

      expeditionScore: 88,

      description:
        "Operational aftermarket procurement network with strong national fulfillment coverage."
    },

    lrdirect: {

      id: "lrdirect",

      name: "LR Direct",

      region: "United Kingdom",

      health: "DEGRADED",

      latencyMs: 612,

      activeFeeds: 7,

      expeditionScore: 95,

      description:
        "Land Rover specialist procurement intelligence with expedition-grade Defender coverage."
    }
  }

// ============================================================
// COMPONENT
// ============================================================

export default function SupplierPage(){

  // ==========================================================
  // ROUTING
  // ==========================================================

  const params =
    useParams()

  const supplierId =
    String(
      params?.supplier || ""
    ).toLowerCase()

  // ==========================================================
  // DATA
  // ==========================================================

  const supplier =
    useMemo(() => {

      return SUPPLIERS[supplierId]

    }, [supplierId])

  // ==========================================================
  // NOT FOUND
  // ==========================================================

  if(!supplier){

    return (

      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#020817]
          px-6
          text-white
        "
      >

        <div
          className="
            max-w-[600px]
            rounded-[32px]
            border
            border-slate-800
            bg-[#07101F]
            p-8
            text-center
          "
        >

          <div
            className="
              text-[13px]
              font-black
              uppercase
              tracking-[0.24em]
              text-slate-500
            "
          >
            Supplier Not Found
          </div>

          <h1
            className="
              mt-4
              text-[34px]
              font-black
              tracking-[-0.08em]
            "
          >
            Unknown Tactical Supplier
          </h1>

          <p
            className="
              mt-4
              text-[15px]
              leading-relaxed
              text-slate-400
            "
          >
            The requested supplier does not exist in the
            operational federation registry.
          </p>

          <Link

            href="/"

            className="
              mt-8
              inline-flex
              items-center
              rounded-full
              border
              border-cyan-800
              bg-cyan-950/20
              px-5
              py-3
              text-[12px]
              font-black
              uppercase
              tracking-[0.16em]
              text-cyan-300
              transition-all
              duration-200
              hover:bg-cyan-900/30
            "
          >
            Return To Dashboard
          </Link>

        </div>

      </main>
    )
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <main
      className="
        min-h-screen
        bg-[#020817]
        text-white
      "
    >

      {/* ==================================================== */}
      {/* HEADER */}
      {/* ==================================================== */}

      <section
        className="
          border-b
          border-slate-800
          bg-[#07101F]
        "
      >

        <div
          className="
            mx-auto
            max-w-[1600px]
            px-5
            py-8
          "
        >

          <div
            className="
              flex
              flex-wrap
              items-start
              justify-between
              gap-6
            "
          >

            <div>

              <div
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.22em]
                  text-cyan-400
                "
              >
                Tactical Supplier Intelligence
              </div>

              <h1
                className="
                  mt-3
                  text-[42px]
                  font-black
                  tracking-[-0.08em]
                "
              >
                {supplier.name}
              </h1>

              <div
                className="
                  mt-4
                  max-w-[760px]
                  text-[15px]
                  leading-relaxed
                  text-slate-400
                "
              >
                {supplier.description}
              </div>

            </div>

            {/* =============================================== */}
            {/* STATUS */}
            {/* =============================================== */}

            <div
              className="
                rounded-[24px]
                border
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
                  tracking-[0.18em]
                  text-slate-500
                "
              >
                Federation Health
              </div>

              <div
                className={`

                  mt-3
                  text-[28px]
                  font-black
                  tracking-[-0.08em]

                  ${

                    supplier.health === "HEALTHY"

                    ?

                    "text-emerald-300"

                    :

                    supplier.health === "DEGRADED"

                    ?

                    "text-amber-300"

                    :

                    "text-red-300"
                  }
                `}
              >
                {supplier.health}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================== */}
      {/* CONTENT */}
      {/* ==================================================== */}

      <section
        className="
          mx-auto
          max-w-[1600px]
          px-5
          py-6
        "
      >

        <div
          className="
            grid
            gap-5

            lg:grid-cols-3
          "
        >

          {/* =============================================== */}
          {/* LATENCY */}
          {/* =============================================== */}

          <OperationalCard

            label="Federation Latency"

            value={`${supplier.latencyMs}ms`}

            description="
              Real-time supplier federation response
              telemetry from operational procurement
              acquisition systems.
            "

          />

          {/* =============================================== */}
          {/* FEEDS */}
          {/* =============================================== */}

          <OperationalCard

            label="Active Feeds"

            value={String(supplier.activeFeeds)}

            description="
              Live procurement federation feeds currently
              synchronized into tactical supplier
              intelligence systems.
            "

          />

          {/* =============================================== */}
          {/* SCORE */}
          {/* =============================================== */}

          <OperationalCard

            label="Expedition Score"

            value={`${supplier.expeditionScore}`}

            description="
              Expedition-grade reliability score based
              on fulfillment, telemetry stability and
              procurement continuity.
            "

          />

        </div>

        {/* ================================================= */}
        {/* OPERATIONS */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            rounded-[32px]
            border
            border-slate-800
            bg-[#07101F]
            p-6
          "
        >

          <div
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.2em]
              text-cyan-400
            "
          >
            Operational Procurement Layer
          </div>

          <h2
            className="
              mt-4
              text-[28px]
              font-black
              tracking-[-0.08em]
            "
          >
            Tactical Federation Operations
          </h2>

          <div
            className="
              mt-5
              grid
              gap-4

              md:grid-cols-2
            "
          >

            <ActionTile
              title="Federation Acquisition"
              description="
                Initiate tactical procurement acquisition
                across operational supplier feeds.
              "
            />

            <ActionTile
              title="Telemetry Synchronization"
              description="
                Validate federation latency and operational
                synchronization health.
              "
            />

            <ActionTile
              title="Inventory Intelligence"
              description="
                Analyze live supplier inventory and
                Defender-specific availability.
              "
            />

            <ActionTile
              title="Operational Routing"
              description="
                Coordinate expedition procurement routing
                and tactical logistics workflows.
              "
            />

          </div>

        </div>

      </section>

    </main>
  )
}

// ============================================================
// CARD
// ============================================================

function OperationalCard({

  label,
  value,
  description

}: {

  label: string

  value: string

  description: string

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
          text-[11px]
          font-black
          uppercase
          tracking-[0.2em]
          text-slate-500
        "
      >
        {label}
      </div>

      <div
        className="
          mt-4
          text-[36px]
          font-black
          tracking-[-0.08em]
          text-cyan-300
        "
      >
        {value}
      </div>

      <div
        className="
          mt-4
          text-[14px]
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
// TILE
// ============================================================

function ActionTile({

  title,
  description

}: {

  title: string

  description: string

}){

  return (

    <div
      className="
        rounded-[24px]
        border
        border-slate-800
        bg-[#020817]
        p-5
        transition-all
        duration-200
        hover:border-cyan-800
      "
    >

      <div
        className="
          text-[16px]
          font-black
          tracking-[-0.04em]
        "
      >
        {title}
      </div>

      <div
        className="
          mt-3
          text-[14px]
          leading-relaxed
          text-slate-400
        "
      >
        {description}
      </div>

    </div>
  )
}