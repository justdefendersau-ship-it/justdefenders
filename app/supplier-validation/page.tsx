// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\supplier-validation\page.tsx
// Timestamp: 14 May 2026 21:00 Sydney

"use client"

import React from "react"

interface ValidationMetrics {
  validated: number
  pending: number
  rejected: number
  confidenceAverage: number
}

interface SupplierValidationItem {
  id: string
  supplier: string
  category: string
  status: "VALIDATED" | "PENDING" | "REJECTED"
  confidence: number
}

export default function SupplierValidationPage() {

  const metrics: ValidationMetrics = {

    validated: 42,

    pending: 5,

    rejected: 2,

    confidenceAverage: 91
  }

  const suppliers: SupplierValidationItem[] = [

    {
      id: "SUP-001",

      supplier:
        "LR Direct",

      category:
        "OEM Components",

      status: "VALIDATED",

      confidence: 95
    },

    {
      id: "SUP-002",

      supplier:
        "Terrain Tamer",

      category:
        "Touring Suspension",

      status: "VALIDATED",

      confidence: 92
    },

    {
      id: "SUP-003",

      supplier:
        "Unknown Marketplace Vendor",

      category:
        "Electrical Components",

      status: "REJECTED",

      confidence: 34
    }

  ]

  function getStatusColour(
    status: SupplierValidationItem["status"]
  ): string {

    switch (status) {

      case "VALIDATED":
        return "#16a34a"

      case "PENDING":
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
          Supplier Validation
        </h1>

        <div
          style={{
            background: "#0f172a",
            borderRadius: "18px",
            padding: "24px",
            marginBottom: "28px",
            border:
              "1px solid rgba(255,255,255,0.08)"
          }}
        >

          <h2
            style={{
              color: "#ffffff",
              marginTop: 0,
              marginBottom: "18px"
            }}
          >
            Validation Metrics
          </h2>

          <div
            style={{
              display: "grid",
              gap: "10px",
              color: "#cbd5e1"
            }}
          >

            <p style={{ margin: 0 }}>
              Validated:
              {" "}
              {metrics.validated}
            </p>

            <p style={{ margin: 0 }}>
              Pending:
              {" "}
              {metrics.pending}
            </p>

            <p style={{ margin: 0 }}>
              Rejected:
              {" "}
              {metrics.rejected}
            </p>

            <p style={{ margin: 0 }}>
              Confidence Average:
              {" "}
              {metrics.confidenceAverage}%
            </p>

          </div>

        </div>

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
              item: SupplierValidationItem
            ) => (

              <div
                key={item.id}
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
                    {item.supplier}
                  </h2>

                  <span
                    style={{
                      background:
                        getStatusColour(
                          item.status
                        ),

                      color: "#ffffff",

                      padding: "6px 10px",

                      borderRadius: "999px",

                      fontSize: "11px",

                      fontWeight: 700
                    }}
                  >
                    {item.status}
                  </span>

                </div>

                <div
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "10px"
                  }}
                >
                  Category:
                  {" "}
                  {item.category}
                </div>

                <div
                  style={{
                    color: "#93c5fd",
                    fontWeight: 700
                  }}
                >
                  Confidence:
                  {" "}
                  {item.confidence}%
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )
}