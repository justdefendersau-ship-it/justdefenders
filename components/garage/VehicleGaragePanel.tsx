// ============================================================
// JustDefenders©
// File:
// C:\dev\justdefenders\frontend\components\garage\VehicleGaragePanel.tsx
//
// Timestamp:
// 26 May 2026 12:10 Sydney
// ============================================================
//
// PURPOSE:
// Safe vehicle garage operational workflow.
//
// FEATURES:
// - Vehicle overview
// - VIN visibility
// - Odometer baseline
// - Service readiness
// - Expedition readiness
//
// IMPORTANT:
// - SAFE RESTORATION
// - NO realtime
// - NO federation
// - NO sockets
// ============================================================

"use client"

// ============================================================
// COMPONENT
// ============================================================

export default function VehicleGaragePanel(){

  const vehicle = {

    name: "Defender 110",

    vin: "SALXXXXXXXXXXXX",

    odometer: 214532,

    serviceStatus: "CURRENT",

    expeditionReady: true,

    lastService: "2026-05-12",

    fuelType: "Diesel",

    tyreStatus: "GOOD",

    batteryStatus: "GOOD"
  }

  return (

    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
    >

      <div
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Vehicle Garage
      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        "
      >

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            Vehicle
          </div>

          <div
            className="
              text-xl
              font-semibold
              mt-2
            "
          >
            {vehicle.name}
          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            VIN
          </div>

          <div
            className="
              mt-2
              font-mono
            "
          >
            {vehicle.vin}
          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            Odometer
          </div>

          <div
            className="
              text-xl
              font-semibold
              mt-2
            "
          >
            {vehicle.odometer}
            {" "}
            km
          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            Fuel Type
          </div>

          <div
            className="
              text-xl
              font-semibold
              mt-2
            "
          >
            {vehicle.fuelType}
          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            Service Status
          </div>

          <div
            className="
              text-green-400
              font-semibold
              mt-2
            "
          >
            {vehicle.serviceStatus}
          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            Expedition Readiness
          </div>

          <div
            className="
              mt-2
              font-semibold
            "
          >
            {
              vehicle.expeditionReady
                ? "READY"
                : "NOT READY"
            }
          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            Tyre Status
          </div>

          <div
            className="
              mt-2
              font-semibold
            "
          >
            {vehicle.tyreStatus}
          </div>

        </div>

        <div
          className="
            bg-black
            rounded-xl
            p-4
            border
            border-zinc-800
          "
        >

          <div className="text-zinc-400">
            Battery Status
          </div>

          <div
            className="
              mt-2
              font-semibold
            "
          >
            {vehicle.batteryStatus}
          </div>

        </div>

      </div>

    </div>
  )
}