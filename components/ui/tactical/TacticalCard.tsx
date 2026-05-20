/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalCard.tsx
 *
 * Timestamp:
 * 17 May 2026 05:35 Sydney
 *
 * PURPOSE:
 * Tactical Operational Card Component
 * ============================================================
 */

"use client"

import {
  motion
} from "framer-motion"

import {
  ReactNode
} from "react"

import {
  tacticalColors,
  tacticalShadows
} from "@/styles/tokens"

interface TacticalCardProps {

  children: ReactNode

  className?: string

  title?: string

  subtitle?: string

  icon?: ReactNode

  action?: ReactNode

  glow?: boolean

  hover?: boolean

  bordered?: boolean
}

export default function TacticalCard({

  children,

  className = "",

  title,

  subtitle,

  icon,

  action,

  glow = false,

  hover = true,

  bordered = true

}: TacticalCardProps) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.22
      }}

      whileHover={
        hover
          ? {
              y: -3,
              scale: 1.005
            }
          : undefined
      }

      className={`
        relative
        overflow-hidden
        rounded-[28px]
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        ${className}
      `}

      style={{

        background:
          "linear-gradient(to bottom right, rgba(18,26,43,0.78), rgba(11,17,32,0.72))",

        border:
          bordered
            ? `1px solid rgba(255,255,255,0.06)`
            : "none",

        backdropFilter:
          "blur(18px)",

        boxShadow:
          glow
            ? `
              ${tacticalShadows.glowBlue},
              0 20px 48px rgba(0,0,0,0.34)
            `
            : `
              ${tacticalShadows.card},
              0 16px 40px rgba(0,0,0,0.26)
            `
      }}
    >

      {/* ================================================= */}
      {/* TOP HIGHLIGHT */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-[1px]
        "
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)"
        }}
      />

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      {(title || subtitle || icon || action) && (

        <div
          className="
            mb-5
            flex
            items-start
            justify-between
            gap-5
          "
        >

          <div
            className="
              flex
              items-start
              gap-4
            "
          >

            {icon && (

              <div
                className="
                  mt-0.5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{

                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    `1px solid rgba(255,255,255,0.05)`,

                  backdropFilter:
                    "blur(12px)"
                }}
              >
                {icon}
              </div>
            )}

            <div>

              {title && (

                <h3
                  className="
                    text-lg
                    font-semibold
                    tracking-tight
                  "
                  style={{
                    color:
                      tacticalColors.textPrimary
                  }}
                >
                  {title}
                </h3>
              )}

              {subtitle && (

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                  "
                  style={{
                    color:
                      tacticalColors.textSecondary
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {action && (

            <div>
              {action}
            </div>
          )}
        </div>
      )}

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="relative z-10">

        {children}

      </div>

      {/* ================================================= */}
      {/* TACTICAL GLOW */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.06]
        "
        style={{
          background:
            "radial-gradient(circle at top right, #4F7CFF, transparent 55%)"
        }}
      />

      {/* ================================================= */}
      {/* BOTTOM AMBIENT GLOW */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-80px]
          left-1/2
          h-[180px]
          w-[280px]
          -translate-x-1/2
          rounded-full
          blur-3xl
          opacity-[0.08]
        "
        style={{
          background:
            tacticalColors.accentBlue
        }}
      />

    </motion.div>
  )
}