/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\procurement\ProcurementSearchHero.tsx
 *
 * Timestamp:
 * 22 May 2026 08:30 Sydney
 *
 * PURPOSE:
 * Tactical Procurement Header
 *
 * STRATEGY:
 * PASS 30A — Tactical Compression Stabilization
 *
 * OBJECTIVES:
 * - reduce vertical heaviness
 * - improve operational compression
 * - improve procurement scan cadence
 * - normalize command hierarchy
 * - stabilize Alpha presentation
 *
 * ============================================================
 */

"use client"

import {

  Search,
  Shield,
  Truck,
  BadgeDollarSign,
  Mail,
  Printer,
  SlidersHorizontal,
  Menu,
  Car

} from "lucide-react"

import {

  useMobileDetection

} from "@/hooks/useMobileDetection"

// ============================================================
// COMPONENT
// ============================================================

export default function ProcurementSearchHero(){

  const {

    isMobile

  } = useMobileDetection()

  return (

    <section
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-900
        bg-[#020817]/95
        backdrop-blur-xl
      "
    >

      {/* ==================================================== */}
      {/* TOP ROW */}
      {/* ==================================================== */}

      <div
        className="
          px-4
          py-3
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-[1850px]
            items-start
            justify-between
            gap-5
          "
        >

          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div>

            <div
              className={`
                font-black
                leading-[0.88]
                tracking-[-0.04em]
                text-[#D4D7DD]

                ${
                  isMobile

                  ?

                  "text-[38px]"

                  :

                  "text-[58px]"
                }
              `}
            >
              JustDefenders©
            </div>

            <div
              className="
                mt-1
                pl-[2px]
                text-[11px]
                font-black
                uppercase
                tracking-[0.34em]
                text-[#38BDF8]
              "
            >
              Operational Parts Intelligence
            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          {

            isMobile

            ?

            <button
              className="
                flex
                h-[52px]
                w-[52px]
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-800
                bg-[#07101F]
              "
            >

              <Menu
                className="
                  h-5
                  w-5
                  text-white
                "
              />

            </button>

            :

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <TopActionButton
                icon={<Car className="h-4 w-4" />}
                label="Vehicle"
              />

              <TopActionButton
                icon={<Search className="h-4 w-4" />}
                label="VIN"
              />

              <button
                className="
                  h-[48px]
                  rounded-2xl
                  bg-[#2563EB]
                  px-6
                  text-[14px]
                  font-black
                  text-white
                  transition-all
                  hover:bg-[#3B82F6]
                "
              >
                Login
              </button>

            </div>
          }

        </div>

      </div>

      {/* ==================================================== */}
      {/* SEARCH ROW */}
      {/* ==================================================== */}

      <div
        className="
          border-t
          border-slate-900
          px-4
          py-3
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-[1850px]
            flex-col
            gap-4
            xl:flex-row
            xl:items-center
          "
        >

          {/* ================================================= */}
          {/* SEARCH */}
          {/* ================================================= */}

          <div
            className="
              flex-1
            "
          >

            <div
              className="
                flex
                items-center
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-[#07101F]
              "
            >

              <div
                className="
                  px-5
                  text-slate-500
                "
              >

                <Search
                  className="
                    h-5
                    w-5
                  "
                />

              </div>

              <input
                placeholder="
                  Search OEM, SKU, supplier, expedition part...
                "
                defaultValue="
                  ERR3340
                "
                className="
                  h-[52px]
                  flex-1
                  bg-transparent
                  text-[16px]
                  font-semibold
                  text-white
                  outline-none
                  placeholder:text-slate-500
                "
              />

            </div>

          </div>

          {/* ================================================= */}
          {/* FILTERS */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <TacticalChip
              icon={<BadgeDollarSign className="h-4 w-4" />}
              label="Best Price"
            />

            <TacticalChip
              icon={<Shield className="h-4 w-4" />}
              label="Verified"
            />

            <TacticalChip
              icon={<Truck className="h-4 w-4" />}
              label="In Stock"
            />

            <TacticalChip
              icon={<Truck className="h-4 w-4" />}
              label="Fast Delivery"
            />

            <TacticalChip
              icon={<Shield className="h-4 w-4" />}
              label="Secure"
            />

          </div>

          {/* ================================================= */}
          {/* VEHICLE */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <select className={selectClass}>
              <option>Model</option>
            </select>

            <select className={selectClass}>
              <option>Engine</option>
            </select>

            <select className={selectClass}>
              <option>Year</option>
            </select>

            <button
              className="
                h-[52px]
                rounded-2xl
                bg-[#2563EB]
                px-6
                text-[14px]
                font-black
                text-white
              "
            >
              Search
            </button>

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* FILTER ROW */}
      {/* ==================================================== */}

      <div
        className="
          border-t
          border-slate-900
          px-4
          py-2
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-[1850px]
            flex-col
            gap-4
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <ModeChip label="OEM" active />
            <ModeChip label="Aftermarket" />
            <ModeChip label="Used" />
            <ModeChip label="International" />
            <ModeChip label="Expedition" active />
            <ModeChip label="Trade" />
            <ModeChip label="Close To Me" />
            <ModeChip label="AU Priority" active />

            <button
              className="
                h-[40px]
                rounded-2xl
                border
                border-[#1D4ED8]
                bg-[#071B46]
                px-5
                text-[13px]
                font-black
                text-[#60A5FA]
              "
            >
              Open Procurement List
            </button>

          </div>

          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <ActionButton
              icon={<SlidersHorizontal className="h-4 w-4" />}
              label="More Filters"
            />

            <ActionButton
              icon={<Mail className="h-4 w-4" />}
              label="Email"
            />

            <ActionButton
              icon={<Printer className="h-4 w-4" />}
              label="Print"
            />

          </div>

        </div>

      </div>

    </section>
  )
}

// ============================================================
// SELECT CLASS
// ============================================================

const selectClass = `
  h-[52px]
  rounded-2xl
  border
  border-slate-800
  bg-[#07101F]
  px-4
  text-[14px]
  font-bold
  text-white
  outline-none
`

// ============================================================
// TACTICAL CHIP
// ============================================================

function TacticalChip({

  icon,

  label

}: {

  icon: React.ReactNode

  label: string

}){

  return (

    <div
      className="
        flex
        h-[40px]
        items-center
        gap-2
        rounded-2xl
        border
        border-slate-800
        bg-[#07101F]
        px-4
        text-[13px]
        font-black
        text-slate-200
      "
    >

      {icon}

      <span>
        {label}
      </span>

    </div>
  )
}

// ============================================================
// MODE CHIP
// ============================================================

function ModeChip({

  label,

  active

}: {

  label: string

  active?: boolean

}){

  return (

    <button
      className={`
        h-[40px]
        rounded-2xl
        px-5
        text-[13px]
        font-black

        ${
          active

          ?

          "bg-[#071B46] text-[#60A5FA] border border-[#1D4ED8]"

          :

          "border border-slate-800 bg-[#07101F] text-slate-300"
        }
      `}
    >
      {label}
    </button>
  )
}

// ============================================================
// ACTION BUTTON
// ============================================================

function ActionButton({

  icon,

  label

}: {

  icon: React.ReactNode

  label: string

}){

  return (

    <button
      className="
        flex
        h-[40px]
        items-center
        gap-2
        rounded-2xl
        border
        border-slate-800
        bg-[#07101F]
        px-5
        text-[13px]
        font-black
        text-slate-300
      "
    >

      {icon}

      <span>
        {label}
      </span>

    </button>
  )
}

// ============================================================
// TOP ACTION BUTTON
// ============================================================

function TopActionButton({

  icon,

  label

}: {

  icon: React.ReactNode

  label: string

}){

  return (

    <button
      className="
        flex
        h-[48px]
        items-center
        gap-2
        rounded-2xl
        border
        border-slate-800
        bg-[#07101F]
        px-5
        text-[13px]
        font-black
        text-slate-300
      "
    >

      {icon}

      <span>
        {label}
      </span>

    </button>
  )
}