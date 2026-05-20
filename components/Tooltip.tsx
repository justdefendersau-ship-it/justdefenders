// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\Tooltip.tsx
// Timestamp: 14 May 2026 13:30 Sydney

"use client"

import React, {
  useState,
  type CSSProperties,
  type ReactNode
} from "react"

interface TooltipProps {
  text: string
  children: ReactNode
}

export default function Tooltip({
  text,
  children
}: TooltipProps) {

  const [show, setShow] = useState(false)

  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "inline-block"
  }

  const tooltipStyle: CSSProperties = {
    position: "absolute",
    bottom: "120%",
    left: 0,
    background: "#0f172a",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 12,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
    zIndex: 9999,
    border: "1px solid rgba(255,255,255,0.08)"
  }

  return (

    <div
      style={wrapperStyle}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >

      {children}

      {show && (

        <div style={tooltipStyle}>
          {text}
        </div>

      )}

    </div>

  )
}