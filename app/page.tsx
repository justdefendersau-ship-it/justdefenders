// ============================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\app\page.tsx
//
// Timestamp:
// 26 May 2026 11:20 Sydney
// ============================================================
//
// PURPOSE:
// Safe operational restoration baseline.
//
// RESTORED SYSTEMS:
// - Fuel Intelligence
// - Vehicle Summary
// - Vehicle Health
// - Operational Alerts
// - Voice Operations
//
// IMPORTANT:
// - NO realtime sockets
// - NO federation streaming
// - NO orchestration runtime
// - NO telemetry hooks
// - SAFE STATIC RESTORATION ONLY
// ============================================================

"use client"

import FuelIntelligenceCard
from "@/components/command-centre/FuelIntelligenceCard"

import VehicleSummaryCard
from "@/components/command-centre/VehicleSummaryCard"

import VehicleHealthCard
from "@/components/command-centre/VehicleHealthCard"

import OperationalAlerts
from "@/components/command-centre/OperationalAlerts"

import VoiceOperations
from "@/components/voice/VoiceOperations"

import FuelOperationsPanel
from "@/components/fuel/FuelOperationsPanel"

// ============================================================
// SAFE MOCK DATA
// ============================================================

const mockFuel = {

  average: 11.2,

  lastLocation: "Sydney",

  latitude: -33.8688,

  longitude: 151.2093
}

const mockVehicle = {

  vehicle: "Defender 110",

  vin: "SALXXXXXXXXXXXX",

  status: "OPERATIONAL",

  readiness: 92
}

const mockHealth = {

  engine: "GOOD",

  battery: "GOOD",

  cooling: "GOOD",

  alerts: 1
}

const mockAlerts = [

  {
    level: "warn",
    message: "Fuel anomaly detected"
  },

  {
    level: "info",
    message: "Telemetry synchronized"
  }
]

// ============================================================
// PAGE
// ============================================================

export default function HomePage(){

  return (

    <main
      className="
        min-h-screen
        bg-black
        text-white
        p-6
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          mb-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          JustDefenders
        </h1>

        <div
          className="
            text-gray-400
            mt-2
          "
        >
          Operational Intelligence Platform
        </div>

      </div>

      {/* =====================================================
          SAFE OPERATIONAL DASHBOARD
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        <FuelIntelligenceCard
          fuel={mockFuel}
        />

        <VehicleSummaryCard
          vehicle={mockVehicle}
        />

        <VehicleHealthCard
          health={mockHealth}
        />

        <OperationalAlerts
          alerts={mockAlerts}
        />

      </div>

{/* =====================================================
    VOICE OPERATIONS
===================================================== */}

<div
  className="
    mt-10
  "
>

  <div
    className="
      text-2xl
      font-semibold
      mb-4
    "
  >
    Voice Operations
  </div>

  <VoiceOperations />

</div>

{/* =====================================================
    FUEL OPERATIONS
===================================================== */}

<div className="mt-10">

  <FuelOperationsPanel />

</div>

    </main>
  )
}