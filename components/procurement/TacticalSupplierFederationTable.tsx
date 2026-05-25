/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\TacticalSupplierFederationTable.tsx
 *
 * Timestamp:
 * 24 May 2026 01:42 Sydney
 *
 * PURPOSE:
 * Tactical Federation Results Reconstruction
 *
 * STRATEGY:
 * PASS 46A.2 — Tactical Federation Results Reconstruction
 *
 * OBJECTIVES:
 * - tactical procurement federation grid
 * - operational supplier orchestration
 * - federation telemetry visualization
 * - tactical procurement scoring
 * - expedition-aware supplier ranking
 * - compact operational command-centre density
 * - supplier intelligence overlays
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Globe,
  Shield,
  ShoppingCart,
  Truck,
  Wrench

} from "lucide-react"

import OperationalTooltip from "@/components/tooltips/OperationalTooltip"

// ============================================================
// TYPES
// ============================================================

export interface TacticalFederationSupplier {

  id: string

  supplier: string

  brand: string

  part: string

  sku: string

  score: number

  price: number

  clubPrice?: number

  tradePrice?: number

  stock: string

  delivery: string

  latency: number

  health:
    "HEALTHY"
    |
    "DEGRADED"
    |
    "OFFLINE"

  fitment: number

  verified: boolean

  expeditionReady: boolean

  oemCompatible: boolean

  tacticalPriority?: boolean
}

interface TacticalSupplierFederationTableProps {

  suppliers:
    TacticalFederationSupplier[]

  vehicleLabel?: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalSupplierFederationTable({

  suppliers,
  vehicleLabel = "Td5 110 1999"

}: TacticalSupplierFederationTableProps){

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        overflow-hidden
        rounded-[34px]
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
          px-6
          py-6
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6

            2xl:flex-row
            2xl:items-center
            2xl:justify-between
          "
        >

          {/* =============================================== */}
          {/* TITLE */}
          {/* =============================================== */}

          <div>

            <div
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.24em]
                text-[#38BDF8]
              "
            >
              Operational Procurement Federation
            </div>

            <div
              className="
                mt-3
                text-[42px]
                font-black
                tracking-[-0.06em]
                text-white
              "
            >
              Tactical Supplier Intelligence
            </div>

            <div
              className="
                mt-4
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <HeaderBadge
                label={`${vehicleLabel}`}
                type="vehicle"
              />

              <HeaderBadge
                label="OEM Compatible"
                type="success"
              />

              <HeaderBadge
                label="Operational Stock"
                type="success"
              />

              <HeaderBadge
                label="Expedition Ready"
                type="warning"
              />

              <HeaderBadge
                label="Verified Supplier"
                type="info"
              />

            </div>

          </div>

          {/* =============================================== */}
          {/* TELEMETRY */}
          {/* =============================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-4
            "
          >

            <CompactTelemetry
              label="Results"
              value={String(suppliers.length)}
              accent="green"
            />

            <CompactTelemetry
              label="Federation"
              value="LIVE"
              accent="cyan"
            />

            <CompactTelemetry
              label="Telemetry"
              value="ACTIVE"
              accent="green"
            />

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* TABLE HEADER */}
      {/* ==================================================== */}

      <div
        className="
          grid
          grid-cols-[2fr_0.7fr_0.8fr_0.9fr_0.9fr_0.8fr]
          border-b
          border-slate-800
          px-6
          py-4
        "
      >

        {

          [

            "Supplier",
            "Score",
            "Delivery",
            "Health",
            "Latency",
            "Pricing"

          ].map(item => (

            <div
              key={item}
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.24em]
                text-slate-500
              "
            >
              {item}
            </div>
          ))
        }

      </div>

      {/* ==================================================== */}
      {/* ROWS */}
      {/* ==================================================== */}

      <div
        className="
          divide-y
          divide-slate-900
        "
      >

        {

          suppliers.map(supplier => (

            <div
              key={supplier.id}
              className="
                px-6
                py-5
                transition-all
                hover:bg-[#020817]
              "
            >

              <div
                className="
                  grid
                  gap-6

                  2xl:grid-cols-[2fr_0.7fr_0.8fr_0.9fr_0.9fr_0.8fr]
                  2xl:items-center
                "
              >

                {/* ========================================= */}
                {/* SUPPLIER */}
                {/* ========================================= */}

                <div>

                  {/* ======================================= */}
                  {/* TOP */}
                  {/* ======================================= */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-5

                      xl:flex-row
                      xl:items-start
                    "
                  >

                    {/* =================================== */}
                    {/* ICON */}
                    {/* =================================== */}

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-slate-700
                        bg-[#07101F]
                        text-[#38BDF8]
                      "
                    >

                      <Truck className="h-5 w-5" />

                    </div>

                    {/* =================================== */}
                    {/* CONTENT */}
                    {/* =================================== */}

                    <div
                      className="
                        flex-1
                      "
                    >

                      {/* =============================== */}
                      {/* NAME */}
                      {/* =============================== */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-4
                        "
                      >

                        <div>

                          <div
                            className="
                              text-[20px]
                              font-black
                              tracking-[-0.04em]
                              text-white
                            "
                          >
                            {supplier.supplier}
                          </div>

                          <div
                            className="
                              mt-2
                              text-[11px]
                              font-black
                              uppercase
                              tracking-[0.18em]
                              text-slate-500
                            "
                          >
                            {supplier.brand}
                          </div>

                        </div>

                        {

                          supplier.tacticalPriority

                          &&

                          <div
                            className="
                              rounded-full
                              border
                              border-cyan-800
                              bg-cyan-950/20
                              px-4
                              py-2
                              text-[10px]
                              font-black
                              uppercase
                              tracking-[0.18em]
                              text-cyan-300
                            "
                          >
                            Tactical Priority
                          </div>
                        }

                      </div>

                      {/* =============================== */}
                      {/* PART */}
                      {/* =============================== */}

                      <div
                        className="
                          mt-5
                        "
                      >

                        <div
                          className="
                            text-[18px]
                            font-black
                            tracking-[-0.04em]
                            text-white
                          "
                        >
                          {supplier.part}
                        </div>

                        <div
                          className="
                            mt-2
                            text-[12px]
                            text-slate-500
                          "
                        >
                          SKU: {supplier.sku}
                        </div>

                      </div>

                      {/* =============================== */}
                      {/* BADGES */}
                      {/* =============================== */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >

                        {

                          supplier.fitment >= 90

                          &&

                          <OperationalBadge
                            label={`${supplier.fitment}% Fitment`}
                            type="success"
                          />
                        }

                        {

                          supplier.oemCompatible

                          &&

                          <OperationalBadge
                            label="OEM Compatible"
                            type="info"
                          />
                        }

                        {

                          supplier.verified

                          &&

                          <OperationalBadge
                            label="Verified Supplier"
                            type="success"
                          />
                        }

                        {

                          supplier.expeditionReady

                          &&

                          <OperationalBadge
                            label="Expedition Ready"
                            type="warning"
                          />
                        }

                        <OperationalBadge
                          label="AU Federation"
                          type="success"
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* ========================================= */}
                {/* SCORE */}
                {/* ========================================= */}

                <div>

                  <OperationalTooltip

                    title="Operational Procurement Score"

                    description="
                      Tactical procurement confidence score
                      calculated from fitment validation,
                      supplier reliability,
                      federation telemetry,
                      expedition survivability weighting,
                      and operational dispatch confidence.
                    "

                    guidance="
                      Higher operational scores indicate
                      safer expedition procurement outcomes
                      and stronger federation trust.
                    "

                    category="telemetry"

                    severity="success"

                  >

                    <div
                      className="
                        text-[48px]
                        font-black
                        tracking-[-0.08em]
                        text-[#4ADE80]
                      "
                    >
                      {supplier.score}
                    </div>

                  </OperationalTooltip>

                </div>

                {/* ========================================= */}
                {/* DELIVERY */}
                {/* ========================================= */}

                <div
                  className="
                    space-y-3
                  "
                >

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
                        text-[#38BDF8]
                      "
                    />

                    <div
                      className="
                        text-[13px]
                        font-black
                        text-white
                      "
                    >
                      {supplier.delivery}
                    </div>

                  </div>

                  <div
                    className="
                      text-[11px]
                      uppercase
                      tracking-[0.16em]
                      text-slate-500
                    "
                  >
                    {supplier.stock}
                  </div>

                </div>

                {/* ========================================= */}
                {/* HEALTH */}
                {/* ========================================= */}

                <div>

                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-3
                      rounded-full
                      border
                      px-4
                      py-3
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.18em]

                      ${

                        supplier.health === "HEALTHY"

                        ?

                        `
                        border-emerald-800
                        bg-emerald-950/20
                        text-emerald-300
                        `

                        :

                        supplier.health === "DEGRADED"

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

                      supplier.health === "HEALTHY"

                      ?

                      <CheckCircle2 className="h-3.5 w-3.5" />

                      :

                      <Activity className="h-3.5 w-3.5" />
                    }

                    {supplier.health}

                  </div>

                </div>

                {/* ========================================= */}
                {/* LATENCY */}
                {/* ========================================= */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Activity
                    className="
                      h-4
                      w-4
                      text-[#38BDF8]
                    "
                  />

                  <div
                    className="
                      text-[15px]
                      font-black
                      text-white
                    "
                  >
                    {supplier.latency}ms
                  </div>

                </div>

                {/* ========================================= */}
                {/* PRICING */}
                {/* ========================================= */}

                <div>

                  <div
                    className="
                      text-[34px]
                      font-black
                      tracking-[-0.06em]
                      text-[#4ADE80]
                    "
                  >
                    ${supplier.price}
                  </div>

                  {

                    supplier.clubPrice

                    &&

                    <div
                      className="
                        mt-2
                        text-[12px]
                        text-slate-500
                      "
                    >
                      Club ${supplier.clubPrice}
                    </div>
                  }

                  {

                    supplier.tradePrice

                    &&

                    <div
                      className="
                        mt-1
                        text-[12px]
                        text-slate-500
                      "
                    >
                      Trade ${supplier.tradePrice}
                    </div>
                  }

                </div>

              </div>

              {/* =========================================== */}
              {/* ACTIONS */}
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

                <ActionButton
                  label="Intelligence"
                  icon={
                    <Shield className="h-4 w-4" />
                  }
                />

                <ActionButton
                  label="Compare"
                  icon={
                    <Wrench className="h-4 w-4" />
                  }
                />

                <ActionButton
                  label="Add"
                  icon={
                    <ShoppingCart className="h-4 w-4" />
                  }
                  primary
                />

                <ActionButton
                  label="View Supplier"
                  icon={
                    <ArrowRight className="h-4 w-4" />
                  }
                />

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

// ============================================================
// HEADER BADGE
// ============================================================

function HeaderBadge({

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
    |
    "vehicle"

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

          type === "vehicle"

          ?

          `
          border-cyan-800
          bg-cyan-950/20
          text-cyan-300
          `

          :

          `
          border-purple-800
          bg-purple-950/20
          text-purple-300
          `
        }
      `}
    >

      {

        type === "vehicle"

        ?

        <Truck className="h-3.5 w-3.5" />

        :

        <BadgeCheck className="h-3.5 w-3.5" />
      }

      {label}

    </div>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function CompactTelemetry({

  label,
  value,
  accent

}: {

  label: string

  value: string

  accent:
    "green"
    |
    "cyan"
}){

  return (

    <div
      className="
        rounded-[22px]
        border
        border-slate-800
        bg-[#07101F]
        px-5
        py-4
        min-w-[120px]
      "
    >

      <div
        className="
          text-[9px]
          font-black
          uppercase
          tracking-[0.22em]
          text-slate-500
        "
      >
        {label}
      </div>

      <div
        className={`
          mt-2
          text-[24px]
          font-black
          tracking-[-0.05em]

          ${

            accent === "green"

            ?

            "text-[#4ADE80]"

            :

            "text-[#38BDF8]"
          }
        `}
      >
        {value}
      </div>

    </div>
  )
}

// ============================================================
// BADGE
// ============================================================

function OperationalBadge({

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
        px-3
        py-2
        text-[10px]
        font-black
        uppercase
        tracking-[0.16em]

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
// ACTION
// ============================================================

function ActionButton({

  label,
  icon,
  primary = false

}: {

  label: string

  icon: React.ReactNode

  primary?: boolean

}){

  return (

    <button
      className={`
        inline-flex
        items-center
        gap-3
        rounded-[16px]
        border
        px-5
        py-3
        text-[11px]
        font-black
        uppercase
        tracking-[0.16em]
        transition-all

        ${

          primary

          ?

          `
          border-cyan-800
          bg-cyan-600
          text-white
          hover:bg-cyan-500
          `

          :

          `
          border-slate-700
          bg-[#020817]
          text-slate-300
          hover:border-slate-600
          hover:text-white
          `
        }
      `}
    >

      {icon}

      {label}

    </button>
  )
}