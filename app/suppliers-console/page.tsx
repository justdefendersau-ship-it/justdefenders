// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\suppliers-console\page.tsx
// Timestamp: 14 May 2026 21:10 Sydney

"use client"

import React from "react"

interface SupplierConsoleItem {
  id: string
  name: string
  category: string
  region: string
  confidence: number
  status: "ACTIVE" | "MONITORING" | "OFFLINE"
}

export default function SuppliersConsolePage() {

  const suppliers: SupplierConsoleItem[] = [

    {
      id: "SUP-001",

      name:
        "LR Direct",

      category:
        "OEM Components",

      region:
        "United Kingdom",

      confidence: 95,

      status: "ACTIVE"
    },

    {
      id: "SUP-002",

      name:
        "Terrain Tamer",

      category:
        "Touring Suspension",

      region:
        "Australia",

      confidence: 92,

      status: "ACTIVE"
    },

    {
      id: "SUP-003",

      name:
        "Allisport",

      category:
        "Performance Cooling",

      region:
        "United Kingdom",

      confidence: 90,

      status: "MONITORING"
    }

  ]

  function getStatusColour(
    status: SupplierConsoleItem["status"]
  ): string {

    switch (status) {

      case "ACTIVE":
        return "#16a34a"

      case "MONITORING":
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
          Suppliers Console
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px"
          }}
        >

          {suppliers.map(
            (
              supplier: SupplierConsoleItem
            ) => (

              <div
                key={supplier.id}
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
                    {supplier.name}
                  </h2>

                  <span
                    style={{
                      background:
                        getStatusColour(
                          supplier.status
                        ),

                      color: "#ffffff",

                      padding: "6px 10px",

                      borderRadius: "999px",

                      fontSize: "11px",

                      fontWeight: 700
                    }}
                  >
                    {supplier.status}
                  </span>

                </div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "10px"
                  }}
                >
                  Category:
                  {" "}
                  {supplier.category}
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "10px"
                  }}
                >
                  Region:
                  {" "}
                  {supplier.region}
                </p>

                <div
                  style={{
                    color: "#93c5fd",
                    fontWeight: 700
                  }}
                >
                  Confidence:
                  {" "}
                  {supplier.confidence}%
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )
}