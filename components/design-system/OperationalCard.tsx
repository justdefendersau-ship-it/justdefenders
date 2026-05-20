// ====================================================================
// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\design-system\OperationalCard.tsx
// Timestamp: 16 May 2026 06:35 Sydney
// ====================================================================

"use client"

import {
  ReactNode
} from "react"

interface Props {

  children:
    ReactNode

  className?: string
}

export default function OperationalCard({
  children,
  className
}: Props) {

  return (

    <div
      className={`

        jd-glass
        jd-panel-glow
        jd-hover-lift

        rounded-3xl
        border
        border-white/5
        p-6
        shadow-2xl

        ${className ?? ""}
      `}
    >

      {
        children
      }

    </div>
  )
}