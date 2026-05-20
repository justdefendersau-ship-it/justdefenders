/**
 * ============================================================
 * JustDefenders ©
 * File:
 * C:\dev\justdefenders\frontend\styles\tacticalTypography.ts
 *
 * Timestamp:
 * 17 May 2026 12:50 Sydney
 *
 * PURPOSE:
 * Tactical Operational Typography System
 *
 * DESCRIPTION:
 * Centralised typography hierarchy for:
 * - operational dashboards
 * - procurement intelligence
 * - telemetry surfaces
 * - tactical cards
 * - expedition workflows
 * - AI recommendation systems
 *
 * This file standardises:
 * - sizing
 * - weights
 * - spacing
 * - tracking
 * - responsive hierarchy
 *
 * ============================================================
 */

// ============================================================
// TYPOGRAPHY TOKENS
// ============================================================

export const tacticalTypography = {

  // ==========================================================
  // HERO / DISPLAY
  // ==========================================================

  displayHero:
    `
      text-3xl
      font-bold
      leading-[1.02]
      tracking-tight
      sm:text-4xl
      xl:text-5xl
    `,

  displaySection:
    `
      text-2xl
      font-bold
      tracking-tight
      xl:text-3xl
    `,

  displayMetric:
    `
      text-4xl
      font-bold
      tracking-tight
      xl:text-5xl
    `,

  // ==========================================================
  // HEADINGS
  // ==========================================================

  headingLarge:
    `
      text-xl
      font-bold
      tracking-tight
      xl:text-2xl
    `,

  headingMedium:
    `
      text-lg
      font-semibold
      tracking-tight
    `,

  headingSmall:
    `
      text-sm
      font-semibold
      uppercase
      tracking-[0.14em]
    `,

  // ==========================================================
  // BODY
  // ==========================================================

  bodyLarge:
    `
      text-base
      leading-relaxed
      xl:text-lg
    `,

  bodyMedium:
    `
      text-sm
      leading-relaxed
    `,

  bodySmall:
    `
      text-xs
      leading-relaxed
    `,

  // ==========================================================
  // LABELS
  // ==========================================================

  label:
    `
      text-xs
      font-semibold
      uppercase
      tracking-[0.14em]
    `,

  labelCompact:
    `
      text-[11px]
      font-semibold
      uppercase
      tracking-[0.12em]
    `,

  // ==========================================================
  // OPERATIONAL DATA
  // ==========================================================

  telemetry:
    `
      text-5xl
      font-bold
      tracking-tight
    `,

  telemetryLabel:
    `
      text-xs
      uppercase
      tracking-[0.14em]
    `,

  metricValue:
    `
      text-3xl
      font-bold
      tracking-tight
    `,

  metricTrend:
    `
      text-sm
      font-medium
    `,

  // ==========================================================
  // PROCUREMENT
  // ==========================================================

  supplierName:
    `
      text-xl
      font-bold
      tracking-tight
    `,

  supplierPrice:
    `
      text-3xl
      font-bold
      tracking-tight
    `,

  supplierMeta:
    `
      text-sm
      leading-relaxed
    `,

  // ==========================================================
  // STATUS / BADGES
  // ==========================================================

  status:
    `
      text-xs
      font-semibold
      uppercase
      tracking-[0.14em]
    `,

  operationalTag:
    `
      text-[10px]
      font-bold
      uppercase
      tracking-[0.18em]
    `
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default tacticalTypography