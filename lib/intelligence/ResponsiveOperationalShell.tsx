/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\layout\ResponsiveOperationalShell.tsx
 *
 * Timestamp:
 * 23 May 2026 16:52 Sydney
 *
 * PURPOSE:
 * Responsive Operational UI Shell
 *
 * STRATEGY:
 * PASS 35C — Responsive Operational UI
 *
 * OBJECTIVES:
 * - mobile operational layouts
 * - responsive telemetry presentation
 * - tactical expedition UX
 * - adaptive dashboard rendering
 * - touch-safe operational controls
 * - field-deployment usability
 *
 * ============================================================
 */

"use client"

import {

  Menu,
  X,
  Shield,
  Activity,
  Globe,
  Truck,
  Wrench,
  Radar

} from "lucide-react"

import {

  useEffect,
  useState

} from "react"

// ============================================================
// TYPES
// ============================================================

interface ResponsiveOperationalShellProps {

  children:
    React.ReactNode
}

// ============================================================
// COMPONENT
// ============================================================

export default function ResponsiveOperationalShell({

  children

}: ResponsiveOperationalShellProps){

  // ==========================================================
  // STATE
  // ==========================================================

  const [

    mobileMenuOpen,
    setMobileMenuOpen

  ] = useState(false)

  const [

    isMobile,
    setIsMobile

  ] = useState(false)

  // ==========================================================
  // MOBILE DETECTION
  // ==========================================================

  useEffect(() => {

    function handleResize(){

      setIsMobile(

        window.innerWidth < 1024
      )
    }

    handleResize()

    window.addEventListener(

      "resize",

      handleResize
    )

    return () => {

      window.removeEventListener(

        "resize",

        handleResize
      )
    }

  }, [])

  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div
      className="
        min-h-screen
        bg-[#020817]
        text-white
      "
    >

      {/* ==================================================== */}
      {/* MOBILE HEADER */}
      {/* ==================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-slate-800
          bg-[#020817]/95
          backdrop-blur
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            px-4
            py-4
            lg:px-6
          "
        >

          {/* ================================================== */}
          {/* BRAND */}
          {/* ================================================== */}

          <div>

            <div
              className="
                text-[18px]
                font-black
                tracking-[-0.04em]
                text-white
              "
            >
              JustDefenders
            </div>

            <div
              className="
                mt-1
                text-[10px]
                font-black
                uppercase
                tracking-[0.24em]
                text-[#38BDF8]
              "
            >
              Operational Intelligence Platform
            </div>

          </div>

          {/* ================================================== */}
          {/* MOBILE BUTTON */}
          {/* ================================================== */}

          {

            isMobile

            &&

            <button
              onClick={() =>

                setMobileMenuOpen(

                  previous => !previous
                )
              }
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-800
                bg-[#07101F]
                text-white
                transition-all
                hover:border-slate-700
              "
            >

              {

                mobileMenuOpen

                ?

                <X className="h-5 w-5" />

                :

                <Menu className="h-5 w-5" />
              }

            </button>
          }

        </div>

      </header>

      {/* ==================================================== */}
      {/* LAYOUT */}
      {/* ==================================================== */}

      <div
        className="
          flex
        "
      >

        {/* ================================================== */}
        {/* SIDEBAR */}
        {/* ================================================== */}

        <aside
          className={`
            fixed
            left-0
            top-[81px]
            z-40
            h-[calc(100vh-81px)]
            w-[300px]
            overflow-y-auto
            border-r
            border-slate-800
            bg-[#07101F]
            transition-transform
            duration-300

            lg:translate-x-0

            ${

              mobileMenuOpen

              ?

              "translate-x-0"

              :

              "-translate-x-full"
            }
          `}
        >

          <div
            className="
              p-5
            "
          >

            <SidebarSection
              title="Operational Intelligence"
            >

              <SidebarItem
                icon={
                  <Shield className="h-5 w-5" />
                }
                label="Operational Readiness"
              />

              <SidebarItem
                icon={
                  <Globe className="h-5 w-5" />
                }
                label="Expedition Intelligence"
              />

              <SidebarItem
                icon={
                  <Truck className="h-5 w-5" />
                }
                label="Procurement Federation"
              />

              <SidebarItem
                icon={
                  <Activity className="h-5 w-5" />
                }
                label="Federation Telemetry"
              />

              <SidebarItem
                icon={
                  <Wrench className="h-5 w-5" />
                }
                label="Predictive Maintenance"
              />

              <SidebarItem
                icon={
                  <Radar className="h-5 w-5" />
                }
                label="Deployment Intelligence"
              />

            </SidebarSection>

          </div>

        </aside>

        {/* ================================================== */}
        {/* MOBILE OVERLAY */}
        {/* ================================================== */}

        {

          mobileMenuOpen

          &&

          isMobile

          &&

          <div
            onClick={() =>

              setMobileMenuOpen(false)
            }
            className="
              fixed
              inset-0
              z-30
              bg-black/70
              backdrop-blur-sm
            "
          />
        }

        {/* ================================================== */}
        {/* MAIN */}
        {/* ================================================== */}

        <main
          className="
            w-full
            lg:ml-[300px]
          "
        >

          <div
            className="
              px-4
              py-5

              sm:px-5
              lg:px-8
              lg:py-8
            "
          >

            {/* ============================================== */}
            {/* STATUS BAR */}
            {/* ============================================== */}

            <div
              className="
                mb-5
                grid
                gap-4

                sm:grid-cols-2
                xl:grid-cols-4
              "
            >

              <OperationalStatusCard
                label="Platform State"
                value="ACTIVE"
                color="green"
              />

              <OperationalStatusCard
                label="Telemetry"
                value="LIVE"
                color="cyan"
              />

              <OperationalStatusCard
                label="Federation"
                value="CONNECTED"
                color="blue"
              />

              <OperationalStatusCard
                label="Deployment"
                value="READY"
                color="amber"
              />

            </div>

            {/* ============================================== */}
            {/* CONTENT */}
            {/* ============================================== */}

            <div
              className="
                space-y-6
              "
            >
              {children}
            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

// ============================================================
// SIDEBAR SECTION
// ============================================================

function SidebarSection({

  title,
  children

}: {

  title: string

  children: React.ReactNode

}){

  return (

    <div>

      <div
        className="
          text-[11px]
          font-black
          uppercase
          tracking-[0.24em]
          text-[#38BDF8]
        "
      >
        {title}
      </div>

      <div
        className="
          mt-4
          space-y-2
        "
      >
        {children}
      </div>

    </div>
  )
}

// ============================================================
// SIDEBAR ITEM
// ============================================================

function SidebarItem({

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
        w-full
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-800
        bg-[#020817]
        px-4
        py-4
        text-left
        transition-all
        hover:border-slate-700
        hover:bg-[#0B1220]
      "
    >

      <div
        className="
          text-[#38BDF8]
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

    </button>
  )
}

// ============================================================
// STATUS CARD
// ============================================================

function OperationalStatusCard({

  label,
  value,
  color

}: {

  label: string

  value: string

  color:
    "green"
    |
    "cyan"
    |
    "blue"
    |
    "amber"

}){

  const colors = {

    green:
      "text-[#4ADE80]",

    cyan:
      "text-[#22D3EE]",

    blue:
      "text-[#60A5FA]",

    amber:
      "text-[#F59E0B]"
  }

  return (

    <div
      className="
        rounded-[24px]
        border
        border-slate-800
        bg-[#07101F]
        p-4
      "
    >

      <div
        className="
          text-[11px]
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
          mt-3
          text-[24px]
          font-black
          tracking-[-0.05em]

          ${colors[color]}
        `}
      >
        {value}
      </div>

    </div>
  )
}