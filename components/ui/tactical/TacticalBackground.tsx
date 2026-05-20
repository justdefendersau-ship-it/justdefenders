/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalBackground.tsx
 *
 * Timestamp:
 * 17 May 2026 05:00 Sydney
 *
 * PURPOSE:
 * Tactical Atmospheric Background Layer
 * ============================================================
 */

"use client"

export default function TacticalBackground() {

  return (

    <>

      {/* ================================================= */}
      {/* PRIMARY RADIAL GLOW */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            -top-[200px]
            right-[-120px]
            h-[520px]
            w-[520px]
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "rgba(79,124,255,0.10)"
          }}
        />

        <div
          className="
            absolute
            bottom-[-180px]
            left-[-140px]
            h-[460px]
            w-[460px]
            rounded-full
            blur-3xl
          "
          style={{
            background:
              "rgba(50,212,255,0.06)"
          }}
        />

      </div>

      {/* ================================================= */}
      {/* TACTICAL GRID */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            )
          `,

          backgroundSize:
            "48px 48px"
        }}
      />

      {/* ================================================= */}
      {/* VIGNETTE */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
        "
        style={{
          background:
            `
            radial-gradient(
              circle at center,
              transparent 40%,
              rgba(0,0,0,0.34) 100%
            )
            `
        }}
      />

    </>
  )
}