// JustDefenders ©
// File: C:\dev\justdefenders\frontend\components\parts-intelligence\CompatibilityConfidenceCard.tsx
// Timestamp: 14 May 2026 15:30 Sydney

"use client"

import React from "react"

import {
  evaluateCompatibilityConfidence
} from "../../lib/parts-intelligence/compatibilityConfidenceEngine"

interface CompatibilityConfidenceCardProps {
  partNumber: string
  vehicleModel: string
  route?: string
}

export default function CompatibilityConfidenceCard({
  partNumber,
  vehicleModel,
  route
}: CompatibilityConfidenceCardProps) {

  const result =
    evaluateCompatibilityConfidence({

      partNumber: partNumber,

      vehicleModel: vehicleModel,

      route: route
    })

  const percentage =
    Math.round(result.score * 100)

  return (

    <div
      style={{
        background: "#0f172a",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid rgba(255,255,255,0.08)"
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

        <h3
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: 700
          }}
        >
          Compatibility Confidence
        </h3>

        <div
          style={{
            background:
              result.compatible
                ? "#16a34a"
                : "#dc2626",

            color: "#ffffff",

            padding: "6px 12px",

            borderRadius: "999px",

            fontSize: "12px",

            fontWeight: 700
          }}
        >
          {percentage}%
        </div>

      </div>

      <div
        style={{
          height: "10px",
          background: "#1e293b",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "18px"
        }}
      >

        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background:
              result.compatible
                ? "#16a34a"
                : "#dc2626",

            transition: "width 0.3s ease"
          }}
        />

      </div>

      <div
        style={{
          marginBottom: "16px"
        }}
      >

        <div
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            marginBottom: "4px"
          }}
        >
          Part Number
        </div>

        <div
          style={{
            color: "#ffffff",
            fontWeight: 600
          }}
        >
          {partNumber}
        </div>

      </div>

      <div
        style={{
          marginBottom: "16px"
        }}
      >

        <div
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            marginBottom: "4px"
          }}
        >
          Vehicle Model
        </div>

        <div
          style={{
            color: "#ffffff",
            fontWeight: 600
          }}
        >
          {vehicleModel}
        </div>

      </div>

      {!!route && (

        <div
          style={{
            marginBottom: "16px"
          }}
        >

          <div
            style={{
              color: "#94a3b8",
              fontSize: "13px",
              marginBottom: "4px"
            }}
          >
            Route
          </div>

          <div
            style={{
              color: "#ffffff",
              fontWeight: 600
            }}
          >
            {route}
          </div>

        </div>

      )}

      <div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            marginBottom: "8px"
          }}
        >
          Confidence Factors
        </div>

        <ul
          style={{
            margin: 0,
            paddingLeft: "18px",
            color: "#cbd5e1"
          }}
        >

          {result.reasons.map(
            (
              reason: string,
              idx: number
            ) => (

              <li
                key={idx}
                style={{
                  marginBottom: "6px",
                  lineHeight: 1.5
                }}
              >
                {reason}
              </li>

            )
          )}

        </ul>

      </div>

    </div>

  )
}