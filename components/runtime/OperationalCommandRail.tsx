import RuntimeStatusCommandCenter
from "@/components/runtime/RuntimeStatusCommandCenter"

import RuntimeCommandDashboard
from "@/components/runtime/RuntimeCommandDashboard"

// ====================================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\runtime\OperationalCommandRail.tsx
//
// Timestamp:
// 28 May 2026 07:05 Sydney
//
// PURPOSE:
// Persistent operational command rail.
// ====================================================================

export default function OperationalCommandRail(){

  return (

    <div
      className="
        space-y-6
        sticky
        top-28
      "
    >

      <RuntimeStatusCommandCenter />

      <RuntimeCommandDashboard />

    </div>
  )
}