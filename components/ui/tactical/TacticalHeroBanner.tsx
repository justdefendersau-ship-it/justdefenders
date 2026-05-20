/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalHeroBanner.tsx
 *
 * Timestamp:
 * 18 May 2026 01:20 Sydney
 * ============================================================
 */

"use client"

import { motion } from "framer-motion"

import {
  tacticalColors
} from "@/styles/tokens"

// ============================================================
// TYPES
// ============================================================

interface TacticalHeroBannerProps {

  title: string

  subtitle: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalHeroBanner({

  title,

  subtitle

}: TacticalHeroBannerProps){

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.4
      }}

      className="
        rounded-3xl
        border
        p-8
      "

      style={{

        background:
          tacticalColors.surfaceElevated,

        borderColor:
          tacticalColors.border,

        boxShadow:
          `0 0 40px rgba(0,0,0,0.35)`
      }}
    >

      {/* ==================================================== */}
      {/* TITLE */}
      {/* ==================================================== */}

      <div

        className="
          max-w-4xl
          text-4xl
          font-black
          leading-tight
          lg:text-5xl
        "

        style={{
          color:
            tacticalColors.textPrimary
        }}
      >
        {title}
      </div>

      {/* ==================================================== */}
      {/* SUBTITLE */}
      {/* ==================================================== */}

      <div

        className="
          mt-5
          max-w-3xl
          text-base
          leading-relaxed
          lg:text-lg
        "

        style={{
          color:
            tacticalColors.textSecondary
        }}
      >
        {subtitle}
      </div>

    </motion.div>
  )
}