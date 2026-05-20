/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalDashboardLayout.tsx
 *
 * Timestamp:
 * 17 May 2026 05:15 Sydney
 *
 * PURPOSE:
 * Tactical Executive Dashboard Layout
 * ============================================================
 */

"use client"

import {
  ReactNode
} from "react"

import {
  Bell,
  Search
} from "lucide-react"

import TacticalSidebar
from "./TacticalSidebar"

import TacticalBackground
from "./TacticalBackground"

import {
  tacticalColors,
  tacticalShadows
} from "@/styles/tokens"

interface TacticalDashboardLayoutProps {

  children: ReactNode

  title?: string

  subtitle?: string

  actions?: ReactNode
}

export default function TacticalDashboardLayout({

  children,

  title = "Operational Intelligence",

  subtitle = "Real-time Defender platform operations",

  actions

}: TacticalDashboardLayoutProps) {

  return (

    <div
      className="
        relative
        flex
        min-h-screen
        overflow-hidden
      "
      style={{
        background:
          tacticalColors.background
      }}
    >

      {/* ================================================= */}
      {/* ATMOSPHERIC BACKGROUND */}
      {/* ================================================= */}

      <TacticalBackground />

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <div className="relative z-10">

        <TacticalSidebar />

      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
        "
      >

        {/* ============================================= */}
        {/* HEADER */}
        {/* ============================================= */}

        <header
          className="
            sticky
            top-0
            z-40
            border-b
            px-8
            py-5
            backdrop-blur-xl
          "
          style={{

            background:
              "rgba(8,12,22,0.72)",

            borderColor:
              tacticalColors.border
          }}
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-6
            "
          >

            {/* ========================================= */}
            {/* TITLE */}
            {/* ========================================= */}

            <div>

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                "
                style={{
                  color:
                    tacticalColors.textPrimary
                }}
              >
                {title}
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                "
                style={{
                  color:
                    tacticalColors.textSecondary
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* ========================================= */}
            {/* ACTIONS */}
            {/* ========================================= */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              {/* Search */}

              <div
                className="
                  hidden
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  px-4
                  py-3
                  lg:flex
                "
                style={{

                  background:
                    "rgba(18,26,43,0.78)",

                  borderColor:
                    tacticalColors.border,

                  backdropFilter:
                    "blur(14px)",

                  boxShadow:
                    tacticalShadows.card
                }}
              >

                <Search
                  size={18}
                  color={tacticalColors.textMuted}
                />

                <input

                  placeholder="
                  Search parts, VINs, suppliers...
                  "

                  className="
                    w-[280px]
                    bg-transparent
                    text-sm
                    outline-none
                  "

                  style={{
                    color:
                      tacticalColors.textPrimary
                  }}
                />
              </div>

              {/* Notifications */}

              <button
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  transition-all
                  duration-200
                "
                style={{

                  background:
                    "rgba(18,26,43,0.78)",

                  borderColor:
                    tacticalColors.border,

                  backdropFilter:
                    "blur(14px)"
                }}
              >

                <Bell
                  size={18}
                  color={tacticalColors.textSecondary}
                />
              </button>

              {/* Custom Actions */}

              {actions}
            </div>
          </div>
        </header>

        {/* ============================================= */}
        {/* CONTENT */}
        {/* ============================================= */}

        <div
          className="
            relative
            z-10
            flex-1
            p-8
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1800px]
            "
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}