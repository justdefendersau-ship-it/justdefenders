/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\components\layout\OperationalAppShell.tsx
 *
 * Timestamp:
 * 24 May 2026 16:33 Sydney
 *
 * PURPOSE:
 * Operational Application Shell
 *
 * PASS 47.5
 * Persistent Deployment Infrastructure Layer
 *
 * ============================================================
 */

"use client"

import Link from "next/link"

import {
  useMemo,
  useState
} from "react"

import {
  usePathname
} from "next/navigation"

import {
  Activity,
  Car,
  LayoutDashboard,
  Menu,
  Package,
  Radar,
  Search,
  ShieldCheck,
  X
} from "lucide-react"

// ============================================================
// TYPES
// ============================================================

interface OperationalAppShellProps {

  title: string

  subtitle: string

  children: React.ReactNode

  actions?: React.ReactNode

  telemetry?: React.ReactNode
}

interface NavigationItem {

  label: string

  href: string

  icon: any
}

interface OperationalCardProps {

  eyebrow?: string

  title: string

  value?: string

  description?: string

  children?: React.ReactNode
}

interface OperationalActionButtonProps {

  href?: string

  label: string

  onClick?: () => void

  icon?: React.ReactNode

  variant?: "primary" | "secondary"
}

// ============================================================
// NAVIGATION
// ============================================================

const NAVIGATION:
  NavigationItem[] = [

    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard
    },

    {
      label: "Parts",
      href: "/parts",
      icon: Package
    },

    {
      label: "Garage",
      href: "/garage",
      icon: Car
    },

    {
      label: "Suppliers",
      href: "/suppliers",
      icon: Radar
    },

    {
      label: "Operations",
      href: "/operations",
      icon: Activity
    }
  ]

// ============================================================
// MAIN SHELL
// ============================================================

export default function OperationalAppShell({

  title,
  subtitle,
  children,
  actions,
  telemetry

}: OperationalAppShellProps){

  const pathname =
    usePathname() ?? "/"

  const [

    mobileMenuOpen,

    setMobileMenuOpen

  ] = useState(false)

  const navigation =
    useMemo(() => {

      return NAVIGATION.map(item => {

        const active =
          pathname.startsWith(
            item.href
          )

        return {

          ...item,

          active
        }

      })

    }, [pathname])

  return (

    <div
      className="
        min-h-screen
        bg-[#020817]
        text-white
      "
    >

      {/* ==================================================== */}
      {/* SIDEBAR */}
      {/* ==================================================== */}

      <aside
        className={`

          fixed
          inset-y-0
          left-0
          z-50
          w-[290px]
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
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            px-6
            py-5
          "
        >

          <div>

            <div
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[0.24em]
                text-cyan-400
              "
            >
              JustDefenders
            </div>

            <div
              className="
                mt-2
                text-[20px]
                font-black
                tracking-[-0.08em]
              "
            >
              Tactical Platform
            </div>

          </div>

          <button

            onClick={() => {

              setMobileMenuOpen(false)
            }}

            className="
              rounded-full
              border
              border-slate-700
              bg-[#020817]
              p-2

              lg:hidden
            "
          >

            <X
              className="
                h-4
                w-4
              "
            />

          </button>

        </div>

        {/* ================================================== */}
        {/* NAV */}
        {/* ================================================== */}

        <nav
          className="
            flex
            flex-col
            gap-2
            p-4
          "
        >

          {

            navigation.map(item => {

              const Icon =
                item.icon

              return (

                <Link

                  key={item.href}

                  href={item.href}

                  className={`

                    flex
                    items-center
                    gap-4
                    rounded-[18px]
                    px-4
                    py-4
                    transition-all
                    duration-200

                    ${

                      item.active

                      ?

                      `
                      border
                      border-cyan-800
                      bg-cyan-950/20
                      text-cyan-300
                      `

                      :

                      `
                      border
                      border-transparent
                      text-slate-400

                      hover:border-slate-700
                      hover:bg-[#020817]
                      hover:text-white
                      `
                    }
                  `}
                >

                  <Icon
                    className="
                      h-5
                      w-5
                    "
                  />

                  <div
                    className="
                      text-[14px]
                      font-bold
                    "
                  >
                    {item.label}
                  </div>

                </Link>
              )
            })
          }

        </nav>

      </aside>

      {/* ==================================================== */}
      {/* MAIN */}
      {/* ==================================================== */}

      <div
        className="
          lg:pl-[290px]
        "
      >

        {/* ================================================== */}
        {/* TOPBAR */}
        {/* ================================================== */}

        <header
          className="
            sticky
            top-0
            z-40
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
              gap-4
              px-5
              py-4

              lg:px-8
            "
          >

            <div>

              <div
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-cyan-400
                "
              >
                Tactical Operations
              </div>

              <div
                className="
                  mt-2
                  text-[28px]
                  font-black
                  tracking-[-0.08em]
                "
              >
                {title}
              </div>

            </div>

            {

              actions

              &&

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                {actions}
              </div>
            }

          </div>

          <div
            className="
              px-5
              pb-5

              lg:px-8
            "
          >

            <div
              className="
                max-w-[1100px]
                text-[15px]
                leading-relaxed
                text-slate-400
              "
            >
              {subtitle}
            </div>

            {

              telemetry

              &&

              <div
                className="
                  mt-5
                "
              >
                {telemetry}
              </div>
            }

          </div>

        </header>

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        <main
          className="
            px-5
            py-6

            lg:px-8
          "
        >
          {children}
        </main>

      </div>

    </div>
  )
}

// ============================================================
// OPERATIONAL CARD
// ============================================================

export function OperationalCard({

  eyebrow,
  title,
  value,
  description,
  children

}: OperationalCardProps){

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

{

  eyebrow

  &&

  <div
    className="
      text-[10px]
      font-black
      uppercase
      tracking-[0.22em]
      text-cyan-400
    "
  >
    {eyebrow}
  </div>
}

<div
  className="
    mt-2
    text-[18px]
    font-black
    tracking-[-0.04em]
    text-white
  "
>
  {title}
</div>

      {

        value

        &&

        <div
          className="
            mt-4
            text-[34px]
            font-black
            tracking-[-0.08em]
            text-white
          "
        >
          {value}
        </div>
      }

      {

        description

        &&

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
      }

      {

        children

        &&

        <div
          className="
            mt-5
          "
        >
          {children}
        </div>
      }

    </div>
  )
}

// ============================================================
// ACTION BUTTON
// ============================================================

export function OperationalActionButton({

  href,
  label,
  onClick,
  icon,
  variant = "primary"

}: OperationalActionButtonProps){

  const variantStyles =

    variant === "secondary"

    ?

    `
    border-slate-700
    bg-[#07101F]
    text-slate-300

    hover:bg-[#0B162B]
    `

    :

    `
    border-cyan-800
    bg-cyan-950/20
    text-cyan-300

    hover:bg-cyan-900/30
    `

  const content = (

    <div
      className={`

        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        border
        px-5
        py-3
        text-[11px]
        font-black
        uppercase
        tracking-[0.18em]
        transition-all
        duration-200

        ${variantStyles}
      `}
    >

      {

        icon

        &&

        <span>
          {icon}
        </span>
      }

      <span>
        {label}
      </span>

    </div>
  )

  if(href){

    return (

      <Link href={href}>
        {content}
      </Link>
    )
  }

  return (

    <button
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  )
}