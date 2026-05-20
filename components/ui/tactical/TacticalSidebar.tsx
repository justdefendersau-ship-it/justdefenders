/**
 * ============================================================
 * JustDefenders ©
 * File: C:\dev\justdefenders\frontend\components\ui\tactical\TacticalSidebar.tsx
 * Timestamp: 17 May 2026 01:20 Sydney
 * Tactical Executive Sidebar
 * ============================================================
 */

"use client"

import Link from "next/link"

import {
  usePathname
} from "next/navigation"

import {
  Car,
  LayoutDashboard,
  Search,
  Shield,
  Truck,
  Wrench
} from "lucide-react"

import {
  tacticalColors
} from "@/styles/tokens"

const navigation = [

  {
    label: "Executive Overview",
    href: "/dashboard",
    icon: LayoutDashboard
  },

  {
    label: "Parts Intelligence",
    href: "/parts",
    icon: Search
  },

  {
    label: "Garage Operations",
    href: "/garage",
    icon: Car
  },

  {
    label: "Maintenance",
    href: "/maintenance",
    icon: Wrench
  },

  {
    label: "Supplier Intelligence",
    href: "/suppliers",
    icon: Truck
  },

  {
    label: "Operational Security",
    href: "/security",
    icon: Shield
  }
]

export default function TacticalSidebar() {

  const pathname =
    usePathname()

  return (

    <aside

      className="
        flex
        h-screen
        w-[280px]
        flex-col
        border-r
        px-5
        py-6
      "

      style={{

        background:
          tacticalColors.background,

        borderColor:
          tacticalColors.border
      }}
    >

      {/* ===================================================== */}
      {/* BRAND */}
      {/* ===================================================== */}

      <div>

        <div
          className="
            text-2xl
            font-bold
            tracking-tight
          "
          style={{
            color:
              tacticalColors.textPrimary
          }}
        >
          JustDefenders
        </div>

        <div
          className="
            mt-2
            text-xs
            uppercase
            tracking-[0.18em]
          "
          style={{
            color:
              tacticalColors.textMuted
          }}
        >
          Operational Intelligence Platform
        </div>
      </div>

      {/* ===================================================== */}
      {/* NAVIGATION */}
      {/* ===================================================== */}

      <nav
        className="
          mt-10
          flex
          flex-col
          gap-2
        "
      >

        {navigation.map((item) => {

          const isActive =
            pathname === item.href

          const Icon =
            item.icon

          return (

            <Link

              key={item.href}

              href={item.href}

              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition-all
                duration-200
              "

              style={{

                background:
                  isActive
                    ? tacticalColors.surfaceElevated
                    : "transparent",

                border:
                  isActive
                    ? `1px solid ${tacticalColors.borderStrong}`
                    : "1px solid transparent"
              }}
            >

              <Icon

                size={18}

                color={
                  isActive
                    ? tacticalColors.accentBlue
                    : tacticalColors.textMuted
                }
              />

              <span
                className="
                  text-sm
                  font-medium
                "
                style={{
                  color:
                    isActive
                      ? tacticalColors.textPrimary
                      : tacticalColors.textSecondary
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <div
        className="
          mt-auto
          rounded-2xl
          border
          p-4
        "

        style={{

          background:
            tacticalColors.surface,

          borderColor:
            tacticalColors.border
        }}
      >

        <div
          className="
            text-xs
            uppercase
            tracking-[0.16em]
          "
          style={{
            color:
              tacticalColors.textMuted
          }}
        >
          Environment
        </div>

        <div
          className="
            mt-2
            flex
            items-center
            gap-2
          "
        >

          <div
            className="
              h-2
              w-2
              rounded-full
            "
            style={{
              background:
                tacticalColors.success
            }}
          />

          <span
            className="
              text-sm
              font-medium
            "
            style={{
              color:
                tacticalColors.textPrimary
            }}
          >
            Production Operational
          </span>
        </div>

        <div
          className="
            mt-4
            text-xs
          "
          style={{
            color:
              tacticalColors.textMuted
          }}
        >
          Tactical Procurement + Fleet Intelligence
        </div>
      </div>
    </aside>
  )
}