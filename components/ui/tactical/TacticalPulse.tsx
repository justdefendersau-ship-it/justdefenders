/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalPulse.tsx
 *
 * Timestamp:
 * 17 May 2026 06:20 Sydney
 *
 * PURPOSE:
 * Tactical Ambient Operational Pulse
 * ============================================================
 */

"use client"

import {
  motion
} from "framer-motion"

interface TacticalPulseProps {

  size?: number

  color?: string

  opacity?: number
}

export default function TacticalPulse({

  size = 10,

  color = "#4F7CFF",

  opacity = 0.9

}: TacticalPulseProps) {

  return (

    <div
      className="
        relative
        flex
        items-center
        justify-center
      "
    >

      {/* ============================================= */}
      {/* OUTER PULSE */}
      {/* ============================================= */}

      <motion.div

        animate={{

          scale: [1, 2.8],

          opacity: [opacity, 0]
        }}

        transition={{

          duration: 2.6,

          repeat: Infinity,

          ease: "easeOut"
        }}

        className="
          absolute
          rounded-full
        "

        style={{

          width: size,

          height: size,

          background: color
        }}
      />

      {/* ============================================= */}
      {/* INNER CORE */}
      {/* ============================================= */}

      <motion.div

        animate={{

          scale: [1, 1.18, 1]
        }}

        transition={{

          duration: 1.8,

          repeat: Infinity
        }}

        className="
          rounded-full
        "

        style={{

          width: size,

          height: size,

          background: color,

          boxShadow:
            `0 0 18px ${color}`
        }}
      />

    </div>
  )
}
