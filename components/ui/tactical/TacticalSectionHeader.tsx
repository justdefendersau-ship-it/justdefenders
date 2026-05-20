/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\components\ui\tactical\TacticalSectionHeader.tsx
 *
 * Timestamp:
 * 17 May 2026 13:05 Sydney
 *
 * PURPOSE:
 * Tactical Operational Section Header
 * ============================================================
 */

"use client"

import {
  tacticalColors
} from "@/styles/tokens"

import {
  tacticalTypography
} from "@/styles/tacticalTypography"

// ============================================================
// TYPES
// ============================================================

interface TacticalSectionHeaderProps {

  eyebrow?: string

  title: string

  description?: string
}

// ============================================================
// COMPONENT
// ============================================================

export default function TacticalSectionHeader({

  eyebrow,

  title,

  description

}: TacticalSectionHeaderProps){

  return (

    <div className="mb-6">

      {/* =================================================== */}
      {/* EYEBROW */}
      {/* =================================================== */}

      {eyebrow && (

        <div

          className={
            tacticalTypography.label
          }

          style={{
            color:
              tacticalColors.accentBlue
          }}
        >
          {eyebrow}
        </div>
      )}

      {/* =================================================== */}
      {/* TITLE */}
      {/* =================================================== */}

      <div

        className={`
          mt-3
          ${tacticalTypography.displaySection}
        `}

        style={{
          color:
            tacticalColors.textPrimary
        }}
      >
        {title}
      </div>

      {/* =================================================== */}
      {/* DESCRIPTION */}
      {/* =================================================== */}

      {description && (

        <div

          className={`
            mt-4
            max-w-4xl
            ${tacticalTypography.bodyLarge}
          `}

          style={{
            color:
              tacticalColors.textSecondary
          }}
        >
          {description}
        </div>
      )}

    </div>
  )
}