// JustDefenders ©
// File: C:\dev\justdefenders\frontend\app\supplier-feed-operations\page.tsx
// Timestamp: 14 May 2026 20:50 Sydney

"use client"

import React from "react"

interface SupplierFeedHealth {
  healthyFeeds: number
  degradedFeeds: number
  offlineFeeds: number
  lastSync: string
}

interface SupplierFeedItem {
  id: string
  supplier: string
  status: "HEALTHY" | "DEGRADED" | "OFFLINE"
  latencyMs: number
}

export default function SupplierFeedOperationsPage() {

  const health: SupplierFeedHealth = {

    healthyFeeds: 18,

    degradedFeeds: 2,

    offlineFeeds: 1,

    lastSync:
      new Date().toLocaleString()
  }

  const feeds: SupplierFeedItem[] = [

    {
      id: "FEED-001",

      supplier:
        "LR Direct",

      status: "HEALTHY",

      latencyMs: 122
    },

    {
      id: "FEED-002",

      supplier:
        "Repco",

      status: "HEALTHY",

      latencyMs: 148
    },

    {
      id: "FEED-003",

      supplier:
        "Terrain Tamer",

      status: "DEGRADED",

      latencyMs: 620
    },

    {
      id: "FEED-004",

      supplier:
        "Allisport",

      status: "OFFLINE",

      latencyMs: 0
    }

  ]

  function getStatusColour(
    status: SupplierFeedItem["status"]
  ): string {

    switch (status) {

      case "HEALTHY":
        return "#16a34a"

      case "DEGRADED":
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
          Supplier Feed Operations
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
            Feed Health
          </h2>

          <div
            style={{
              display: "grid",
              gap: "10px",
              color: "#cbd5e1"
            }}
          >

            <p style={{ margin: 0 }}>
              Healthy Feeds:
              {" "}
              {health.healthyFeeds}
            </p>

            <p style={{ margin: 0 }}>
              Degraded Feeds:
              {" "}
              {health.degradedFeeds}
            </p>

            <p style={{ margin: 0 }}>
              Offline Feeds:
              {" "}
              {health.offlineFeeds}
            </p>

            <p style={{ margin: 0 }}>
              Last Sync:
              {" "}
              {health.lastSync}
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

          {feeds.map(
            (
              item: SupplierFeedItem
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
                    color: "#cbd5e1"
                  }}
                >
                  Latency:
                  {" "}
                  {item.latencyMs}ms
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>

  )
}