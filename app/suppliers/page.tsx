/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\suppliers\page.tsx
 *
 * Timestamp:
 * 23 May 2026 23:02 Sydney
 *
 * PURPOSE:
 * Tactical Suppliers Intelligence Dashboard
 *
 * STRATEGY:
 * PASS 44A — Suppliers Dashboard Tactical Migration
 *
 * OBJECTIVES:
 * - unified operational supplier dashboard
 * - tactical supplier intelligence
 * - federation telemetry visualization
 * - internal supplier intelligence
 * - external supplier federation portal
 * - responsive operational UX
 * - dark command-centre supplier layout
 *
 * ============================================================
 */

"use client"

import {

  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Boxes,
  Building2,
  CheckCircle2,
  Clock3,
  Database,
  Globe,
  Package,
  Search,
  Shield,
  ShoppingCart,
  Truck,
  Users

} from "lucide-react"

import OperationalAppShell, {

  OperationalActionButton,
  OperationalCard

} from "@/components/layout/OperationalAppShell"

// ============================================================
// SUPPLIERS
// ============================================================

const suppliers = [

  {

    name:
      "Allmakes 4x4",

    location:
      "Queensland, Australia",

    spend:
      "$18,720",

    orders:
      6,

    leadTime:
      "2.1d",

    health:
      "EXCELLENT",

    reliability:
      96
  },

  {

    name:
      "Bearmach",

    location:
      "Victoria, Australia",

    spend:
      "$28,340",

    orders:
      8,

    leadTime:
      "1.8d",

    health:
      "EXCELLENT",

    reliability:
      98
  },

  {

    name:
      "Northridge 4x4",

    location:
      "New South Wales",

    spend:
      "$15,330",

    orders:
      5,

    leadTime:
      "2.6d",

    health:
      "GOOD",

    reliability:
      91
  },

  {

    name:
      "Terrain Tamer",

    location:
      "Queensland, Australia",

    spend:
      "$11,280",

    orders:
      7,

    leadTime:
      "2.3d",

    health:
      "GOOD",

    reliability:
      90
  }
]

// ============================================================
// COMPONENT
// ============================================================

export default function SuppliersPage(){

  return (

    <OperationalAppShell

      title="Suppliers"

      subtitle="
        Tactical supplier federation, procurement intelligence,
        expedition sourcing telemetry, and operational supplier analytics.
      "

      actions={

        <>

          <OperationalActionButton

            icon={
              <Truck className="h-4 w-4" />
            }

            label="Add Supplier"
          />

          <OperationalActionButton

            icon={
              <Database className="h-4 w-4" />
            }

            label="Export"

            variant="secondary"
          />

        </>
      }

      telemetry={

        <div
          className="
            grid
            gap-5

            md:grid-cols-2
            xl:grid-cols-5
          "
        >

          <TelemetryCard
            icon={
              <Truck className="h-5 w-5" />
            }
            label="Total Suppliers"
            value="14"
            status="LIVE"
          />

          <TelemetryCard
            icon={
              <Shield className="h-5 w-5" />
            }
            label="Verified"
            value="11"
            status="HEALTHY"
          />

          <TelemetryCard
            icon={
              <Clock3 className="h-5 w-5" />
            }
            label="Avg Lead Time"
            value="2.1d"
            status="ACTIVE"
          />

          <TelemetryCard
            icon={
              <ShoppingCart className="h-5 w-5" />
            }
            label="Open Orders"
            value="7"
            status="TRACKING"
          />

          <TelemetryCard
            icon={
              <BadgeDollarSign className="h-5 w-5" />
            }
            label="YTD Spend"
            value="$128K"
            status="LIVE"
          />

        </div>
      }
    >

      {/* ==================================================== */}
      {/* DUAL PANELS */}
      {/* ==================================================== */}

      <div
        className="
          grid
          gap-8

          2xl:grid-cols-2
        "
      >

        {/* ================================================== */}
        {/* INTERNAL */}
        {/* ================================================== */}

        <OperationalCard

          eyebrow="Internal Supplier Intelligence"

          title="Operational Supplier Command"

        >

          {/* =============================================== */}
          {/* HEADER */}
          {/* =============================================== */}

          <div
            className="
              flex
              flex-col
              gap-5

              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >

            <div>

              <div
                className="
                  text-[14px]
                  leading-relaxed
                  text-slate-400
                "
              >
                Tactical supplier telemetry, procurement
                federation analytics, operational spend
                intelligence, and supplier reliability scoring.
              </div>

            </div>

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <button
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-slate-700
                  bg-[#020817]
                  px-5
                  py-3
                  text-[12px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-slate-300
                "
              >

                Supplier Analytics

                <ArrowRight className="h-4 w-4" />

              </button>

            </div>

          </div>

          {/* =============================================== */}
          {/* TABLE */}
          {/* =============================================== */}

          <div
            className="
              mt-8
              overflow-hidden
              rounded-[28px]
              border
              border-slate-800
            "
          >

            {/* =========================================== */}
            {/* HEAD */}
            {/* =========================================== */}

            <div
              className="
                grid
                grid-cols-[2fr_1fr_1fr_1fr_1fr]
                border-b
                border-slate-800
                bg-[#020817]
                px-6
                py-5
              "
            >

              {

                [

                  "Supplier",
                  "Spend",
                  "Orders",
                  "Lead Time",
                  "Health"

                ].map(item => (

                  <div
                    key={item}
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.20em]
                      text-slate-500
                    "
                  >
                    {item}
                  </div>
                ))
              }

            </div>

            {/* =========================================== */}
            {/* ROWS */}
            {/* =========================================== */}

            {

              suppliers.map(supplier => (

                <div
                  key={supplier.name}
                  className="
                    grid
                    grid-cols-[2fr_1fr_1fr_1fr_1fr]
                    items-center
                    border-b
                    border-slate-900
                    px-6
                    py-6
                    transition-all
                    hover:bg-[#020817]
                  "
                >

                  {/* ===================================== */}
                  {/* NAME */}
                  {/* ===================================== */}

                  <div>

                    <div
                      className="
                        text-[15px]
                        font-black
                        text-white
                      "
                    >
                      {supplier.name}
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

                  {/* ===================================== */}
                  {/* SPEND */}
                  {/* ===================================== */}

                  <div
                    className="
                      text-[14px]
                      font-black
                      text-[#38BDF8]
                    "
                  >
                    {supplier.spend}
                  </div>

                  {/* ===================================== */}
                  {/* ORDERS */}
                  {/* ===================================== */}

                  <div
                    className="
                      text-[14px]
                      font-black
                      text-white
                    "
                  >
                    {supplier.orders}
                  </div>

                  {/* ===================================== */}
                  {/* LEAD */}
                  {/* ===================================== */}

                  <div
                    className="
                      text-[14px]
                      font-black
                      text-white
                    "
                  >
                    {supplier.leadTime}
                  </div>

                  {/* ===================================== */}
                  {/* HEALTH */}
                  {/* ===================================== */}

                  <div>

                    <div
                      className={`
                        inline-flex
                        rounded-full
                        border
                        px-3
                        py-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]

                        ${

                          supplier.health === "EXCELLENT"

                          ?

                          `
                          border-emerald-800
                          bg-emerald-950/30
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
                      {supplier.health}
                    </div>

                  </div>

                </div>
              ))
            }

          </div>

          {/* =============================================== */}
          {/* INSIGHTS */}
          {/* =============================================== */}

          <div
            className="
              mt-8
              grid
              gap-5

              xl:grid-cols-3
            "
          >

            <InsightCard

              icon={
                <AlertTriangle className="h-5 w-5" />
              }

              title="Lead Time Alert"

              description="
                2 suppliers experiencing elevated delivery latency.
              "

              status="warning"
            />

            <InsightCard

              icon={
                <Boxes className="h-5 w-5" />
              }

              title="Stock Intelligence"

              description="
                Expedition-critical inventory availability stable.
              "

              status="success"
            />

            <InsightCard

              icon={
                <Activity className="h-5 w-5" />
              }

              title="Pricing Shift"

              description="
                12 procurement lines changed within federation telemetry.
              "

              status="info"
            />

          </div>

        </OperationalCard>

        {/* ================================================== */}
        {/* EXTERNAL */}
        {/* ================================================== */}

        <OperationalCard

          eyebrow="External Supplier Federation"

          title="Operational Parts Portal"

        >

          {/* =============================================== */}
          {/* SEARCH */}
          {/* =============================================== */}

          <div
            className="
              flex
              flex-col
              gap-5

              xl:flex-row
            "
          >

            <div
              className="
                relative
                flex-1
              "
            >

              <Search
                className="
                  absolute
                  left-5
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                placeholder="
                  Search parts, suppliers, OEM references...
                "
                className="
                  h-[64px]
                  w-full
                  rounded-full
                  border
                  border-slate-800
                  bg-[#020817]
                  pl-14
                  pr-6
                  text-[15px]
                  font-semibold
                  text-white
                  outline-none
                  transition-all
                  placeholder:text-slate-600
                  focus:border-cyan-800
                "
              />

            </div>

            <button
              className="
                inline-flex
                h-[64px]
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-cyan-800
                bg-cyan-950/40
                px-8
                text-[12px]
                font-black
                uppercase
                tracking-[0.18em]
                text-cyan-300
              "
            >

              <Search className="h-4 w-4" />

              Search Federation

            </button>

          </div>

          {/* =============================================== */}
          {/* CATEGORIES */}
          {/* =============================================== */}

          <div
            className="
              mt-8
              grid
              gap-4

              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            <CategoryCard
              icon={
                <Package className="h-5 w-5" />
              }
              label="Brakes"
              count="12,430"
            />

            <CategoryCard
              icon={
                <Truck className="h-5 w-5" />
              }
              label="Drivetrain"
              count="6,321"
            />

            <CategoryCard
              icon={
                <Shield className="h-5 w-5" />
              }
              label="Suspension"
              count="9,872"
            />

            <CategoryCard
              icon={
                <Globe className="h-5 w-5" />
              }
              label="Expedition"
              count="2,148"
            />

          </div>

          {/* =============================================== */}
          {/* PARTS */}
          {/* =============================================== */}

          <div
            className="
              mt-8
              space-y-4
            "
          >

            {

              [

                {

                  part:
                    "ERR3340 Oil Filter",

                  supplier:
                    "Allmakes 4x4",

                  availability:
                    "IN STOCK",

                  price:
                    "$18"
                },

                {

                  part:
                    "Td5 Intercooler Hose",

                  supplier:
                    "Bearmach",

                  availability:
                    "LOW STOCK",

                  price:
                    "$92"
                },

                {

                  part:
                    "Defender Wheel Bearing Kit",

                  supplier:
                    "Terrain Tamer",

                  availability:
                    "IN STOCK",

                  price:
                    "$148"
                }

              ].map(item => (

                <div
                  key={item.part}
                  className="
                    flex
                    flex-col
                    gap-5
                    rounded-[24px]
                    border
                    border-slate-800
                    bg-[#020817]
                    p-6

                    xl:flex-row
                    xl:items-center
                    xl:justify-between
                  "
                >

                  <div>

                    <div
                      className="
                        text-[16px]
                        font-black
                        text-white
                      "
                    >
                      {item.part}
                    </div>

                    <div
                      className="
                        mt-2
                        text-[13px]
                        text-slate-500
                      "
                    >
                      {item.supplier}
                    </div>

                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        text-[20px]
                        font-black
                        tracking-[-0.05em]
                        text-[#4ADE80]
                      "
                    >
                      {item.price}
                    </div>

                    <div
                      className={`
                        rounded-full
                        border
                        px-4
                        py-3
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]

                        ${

                          item.availability === "IN STOCK"

                          ?

                          `
                          border-emerald-800
                          bg-emerald-950/30
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
                      {item.availability}
                    </div>

                    <button
                      className="
                        inline-flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-cyan-800
                        bg-cyan-950/40
                        px-5
                        py-3
                        text-[11px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-cyan-300
                      "
                    >

                      View Supplier

                      <ArrowRight className="h-4 w-4" />

                    </button>

                  </div>

                </div>
              ))
            }

          </div>

          {/* =============================================== */}
          {/* BENEFITS */}
          {/* =============================================== */}

          <div
            className="
              mt-8
              grid
              gap-5

              md:grid-cols-2
            "
          >

            <BenefitCard
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
              title="Verified Suppliers"
              description="
                Federation-trusted operational procurement partners.
              "
            />

            <BenefitCard
              icon={
                <Users className="h-5 w-5" />
              }
              title="Expedition Sourcing"
              description="
                Tactical expedition procurement prioritization.
              "
            />

          </div>

        </OperationalCard>

      </div>

    </OperationalAppShell>
  )
}

// ============================================================
// TELEMETRY
// ============================================================

function TelemetryCard({

  icon,
  label,
  value,
  status

}: {

  icon: React.ReactNode

  label: string

  value: string

  status: string

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
          items-center
          justify-between
          gap-4
        "
      >

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
            bg-[#020817]
            text-[#38BDF8]
          "
        >
          {icon}
        </div>

        <div
          className="
            rounded-full
            border
            border-emerald-800
            bg-emerald-950/30
            px-3
            py-2
            text-[10px]
            font-black
            uppercase
            tracking-[0.18em]
            text-emerald-300
          "
        >
          {status}
        </div>

      </div>

      <div
        className="
          mt-6
          text-[34px]
          font-black
          tracking-[-0.06em]
          text-white
        "
      >
        {value}
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
        {label}
      </div>

    </div>
  )
}

// ============================================================
// INSIGHT
// ============================================================

function InsightCard({

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
        rounded-[24px]
        border
        border-slate-800
        bg-[#020817]
        p-6
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

            flex
            h-12
            w-12
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
              text-[15px]
              font-black
              text-white
            "
          >
            {title}
          </div>

          <div
            className="
              mt-2
              text-[12px]
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

// ============================================================
// CATEGORY
// ============================================================

function CategoryCard({

  icon,
  label,
  count

}: {

  icon: React.ReactNode

  label: string

  count: string

}){

  return (

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
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-700
          bg-[#07101F]
          text-[#38BDF8]
        "
      >
        {icon}
      </div>

      <div
        className="
          mt-5
          text-[16px]
          font-black
          text-white
        "
      >
        {label}
      </div>

      <div
        className="
          mt-2
          text-[12px]
          text-slate-500
        "
      >
        {count} federation parts
      </div>

    </div>
  )
}

// ============================================================
// BENEFIT
// ============================================================

function BenefitCard({

  icon,
  title,
  description

}: {

  icon: React.ReactNode

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
        p-6
      "
    >

      <div
        className="
          flex
          items-start
          gap-4
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
            border-emerald-800
            bg-emerald-950/20
            text-emerald-300
          "
        >
          {icon}
        </div>

        <div>

          <div
            className="
              text-[15px]
              font-black
              text-white
            "
          >
            {title}
          </div>

          <div
            className="
              mt-2
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