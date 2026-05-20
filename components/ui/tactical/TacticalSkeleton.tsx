/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalSkeleton.tsx
 *
 * Timestamp:
 * 17 May 2026 11:15 Sydney
 *
 * PURPOSE:
 * Tactical Operational Skeleton Loader
 * ============================================================
 */

"use client"

import {
  motion
} from "framer-motion"

// ============================================================
// TYPES
// ============================================================

interface TacticalSkeletonProps {

  className?: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalSkeleton({

  className = ""

}: TacticalSkeletonProps) {

  return (

    <motion.div

      animate={{

        opacity: [0.45, 0.9, 0.45]
      }}

      transition={{

        duration: 1.6,

        repeat: Infinity,

        ease: "easeInOut"
      }}

      className={`
        relative
        overflow-hidden
        rounded-2xl
        bg-white/5
        ${className}
      `}
    >

      {/* ================================================= */}
      {/* SHIMMER */}
      {/* ================================================= */}

      <motion.div

        animate={{
          x: ["-100%", "220%"]
        }}

        transition={{

          duration: 1.8,

          repeat: Infinity,

          ease: "linear"
        }}

        className="
          absolute
          inset-y-0
          w-[40%]
          skew-x-[-20deg]
        "

        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)"
        }}
      />

    </motion.div>
  )
}