/**
 * ============================================================
 * JustDefenders©
 * File:
 * C:\dev\justdefenders\frontend\app\observability\page.tsx
 *
 * Timestamp:
 * 21 May 2026 17:08 Sydney
 *
 * PURPOSE:
 * Observability Dashboard
 *
 * STRATEGY:
 * PASS 26 — Production Observability Console
 *
 * ============================================================
 */

import FederationObservabilityConsole
from "@/components/observability/FederationObservabilityConsole"

// ============================================================
// PAGE
// ============================================================

export default function ObservabilityPage(){

  return (

    <main
      className="
        min-h-screen
        bg-[#020617]
        p-6
      "
    >

      <div
        className="
          mx-auto
          max-w-[1800px]
        "
      >

        <FederationObservabilityConsole />

      </div>

    </main>
  )
}