// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\vehicle-garage\page.tsx
// Timestamp: 14 May 2026 21:20 Sydney

"use client"

import React from "react"

interface GarageVehicle {
  id: string
  name: string
  vin: string
  engine: string
  status: "ACTIVE" | "MAINTENANCE" | "OFFLINE"
  confidence: number
}

export default function VehicleGaragePage() {

  const vehicles: GarageVehicle[] = [

    {
      id: "VEH-001",

      name:
        "Defender Puma 2.2 Expedition Build",

      vin:
        "SALLDHMF7BA123456",

      engine:
        "2.2L Duratorq TDCi",

      status: "ACTIVE",

      confidence: 95
    },

    {
      id: "VEH-002",

      name:
        "Defender 110 Touring Platform",

      vin:
        "SALLDHMF7CA654321",

      engine:
        "2.4L Duratorq TDCi",

      status: "MAINTENANCE",

      confidence: 89
    },

    {
      id: "VEH-003",

      name:
        "Remote Operations Support Vehicle",

      vin:
        "SALLDHMF7DA987654",

      engine:
        "300Tdi",

      status: "OFFLINE",

      confidence: 82
    }

  ]

  function getStatusColour(
    status: GarageVehicle["status"]
  ): string {

    switch (status) {

      case "ACTIVE":
        return "#16a34a"

      case "MAINTENANCE":
        return "#f59e0b"

      default:
        return "#dc2626"
    }
  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "32px"
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            color: "#ffffff",
            fontSize: "36px",
            fontWeight: 800,
            marginBottom: "32px"
          }}
        >
          Vehicle Garage
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(340px,1fr))",
            gap: "20px"
          }}
        >

          {vehicles.map(
            (
              vehicle: GarageVehicle
            ) => (

              <div
                key={vehicle.id}
                style={{
                  background: "#0f172a",
                  borderRadius: "18px",
                  padding: "24px",
                  border:
                    "1px solid rgba(255,255,255,0.08)"
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px"
                  }}
                >

                  <h2
                    style={{
                      color: "#ffffff",
                      margin: 0
                    }}
                  >
                    {vehicle.name}
                  </h2>

                  <span
                    style={{
                      background:
                        getStatusColour(
                          vehicle.status
                        ),

                      color: "#ffffff",

                      padding: "6px 10px",

                      borderRadius: "999px",

                      fontSize: "11px",

                      fontWeight: 700
                    }}
                  >
                    {vehicle.status}
                  </span>

                </div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "10px"
                  }}
                >
                  VIN:
                  {" "}
                  {vehicle.vin}
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "10px"
                  }}
                >
                  Engine:
                  {" "}
                  {vehicle.engine}
                </p>

                <div
                  style={{
                    color: "#93c5fd",
                    fontWeight: 700
                  }}
                >
                  Confidence:
                  {" "}
                  {vehicle.confidence}%
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )
}